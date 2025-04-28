import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, SimpleChanges } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-control-geocoder';
import { Store } from "@ngrx/store";
import {
  setMapData,
  setSelectedMapData
} from "../../../store/Map/map.action";

@Component({
  selector: 'app-leaflet',
  templateUrl: './leaflet.component.html',
  styleUrls: ['./leaflet.component.scss']
})
export class LeafletComponent implements AfterViewInit, OnInit {
  breadCrumbItems!: Array<{}>;

  ngOnInit(): void {

    /**
     * BreadCrumb
     */

    this.breadCrumbItems = [
      { label: 'Maps' },
      { label: 'Leaflet', active: true }
    ];

  }
  @Input() searchValue!: string;

  @Input() selectedMapData: any = {};




  map!: L.Map; // Reference to the Leaflet map instance
  polygonLayer!: L.LayerGroup; // Store the polygon layer
  markers: L.Marker[] = [];
  longitude: number = 9.5375;
  latitude: number = 34.8869;
  geocoder = (L.Control as any).Geocoder.nominatim();


  searchLocation(query: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.geocoder.geocode(query, (results: any) => {
        if (results && results.length > 0) {
          resolve(results);
          this.longitude = results[0].center.lng;
          this.latitude = results[0].center.lat;
          this.store.dispatch(setMapData({ mapData: results }));
        } else {
          reject('No results found');
        }
      });
    });
  }


  ngOnChanges(changes: SimpleChanges): void {

    const searchInput = document.querySelector('.leaflet-control-geocoder-form input') as HTMLInputElement;
    const searchButton = document.querySelector('.leaflet-control-geocoder-icon') as HTMLElement;

    if (changes['searchValue']) {

      if (searchInput) {
        this.searchLocation(this.searchValue);
        searchInput.value = this.searchValue;

      }

    }

    if (changes['selectedMapData']) {
      console.log("selectedMapData ", this.selectedMapData);
      if (this.map) {
        this.map.setView([this.selectedMapData.latitude, this.selectedMapData.longitude], 500); // Keep the current zoom level
        this.addMarker(this.selectedMapData.latitude, this.selectedMapData.longitude);
        this.invalidateSize();
      }

    }
  }

  constructor(private cdr: ChangeDetectorRef, public store: Store) {
  }


  invalidateSize() {
    this.map.invalidateSize()
  }



  // Map options
  options = {
    layers: [
      L.tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoidGhlbWVzYnJhbmQiLCJhIjoiY2xmbmc3bTV4MGw1ejNzbnJqOWpubzhnciJ9.DNkdZVKLnQ6I9NOz7EED-w",
        {
          maxZoom: 18,
          attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          id: "mapbox/streets-v11",
          tileSize: 512,
          zoomOffset: -1,
        }
      )
    ],
    zoom: 7,
    center: L.latLng(this.latitude, this.longitude) // Centering the map on Tunisia
  };



  ngAfterViewInit(): void {
  }

  // Called when the map is ready
  onMapReady(map: L.Map) {
    this.map = map;

    this.map.on('click', (e) => {
      const latLng = e.latlng;
      this.addMarker(latLng.lat, latLng.lng);
    });
    const geocoderControl = (L.Control as any).geocoder({
      defaultMarkGeocode: false
    }).addTo(map);


    map.on('geocoder_showresult', () => {
      const resultsList = document.querySelector('.leaflet-control-geocoder-alternatives') as HTMLElement;
      if (resultsList) {
        resultsList.classList.add('list-group');

        const resultsItems = resultsList.querySelectorAll('li');
        resultsItems.forEach((item) => {
          item.classList.add('list-group-item', 'list-group-item-action');
        });
      }
    });

    //this.store.dispatch(setMap({map: this.map}));
  }


  // Method to add a marker at the specified position
  addMarker(lat: number, lng: number) {
    this.removeAllMarkers();
    const newMarker: any = L.marker([lat, lng])
      .bindPopup(`<b>Marker at:</b><br>Lat: ${lat}<br>Lng: ${lng}`)
      .on('click', () => this.removeMarker(newMarker)); // Attach remove event

    this.map.invalidateSize();

    newMarker.addTo(this.map).openPopup();

    // Add the marker to the array
    this.markers.push(newMarker);

    this.store.dispatch(setSelectedMapData({ selectedMapData: { latitude: `${lat}`, longitude: `${lng}` } }));

  }


  removeMarker(markerToRemove: L.Marker) {
    this.map.removeLayer(markerToRemove);
  }

  removeAllMarkers() {
    this.markers.forEach(marker => this.map.removeLayer(marker)); // Remove each marker from the map
    this.markers = []; // Clear the markers array
  }


  resetSearch(searchInput: HTMLElement) {
    (searchInput as HTMLInputElement).value = ''; // Clear the search input
    const resultsList = document.querySelector('.leaflet-control-geocoder-alternatives') as HTMLElement;
    if (resultsList) {
      resultsList.innerHTML = ''; // Clear the search results
    }
    this.clearPolygon(); // Clear the polygon
    this.map.setView(this.options.center, this.options.zoom); // Reset map to initial view
  }

  clearPolygon() {


    if (this.polygonLayer) {
      // Remove the polygon layer from the map
      this.map.removeLayer(this.polygonLayer);
    }
  }


}
