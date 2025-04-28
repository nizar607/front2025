import { Component, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Store } from '@ngrx/store';
import {
  addcourtData, addcourtDataFailure,
  addcourtDataSuccess,
  deletecourtData,
  fetchcourtData,
  updatecourtData, uploadImage
} from 'src/app/store/Court/court.action';
import { selectcourtData } from 'src/app/store/Court/court-selector';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { passwordMatchValidator } from 'src/app/core/shared/SharedForm';
import { NGXLogger } from "ngx-logger";
import { CourtModel } from "../../../store/Court/court.model";
import { LeafletComponent } from "../../maps/leaflet/leaflet.component";
import { selectMapData, selectSelectedMapData } from "../../../store/Map/map-selector";
import { fetchMapData, setSelectedMapData } from "../../../store/Map/map.action";
import { document } from "ngx-bootstrap/utils";
import { HttpClient } from '@angular/common/http';
import { CourtService } from 'src/app/core/services/court/court.service';


@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
  @ViewChild(LeafletComponent) childComponent!: LeafletComponent;

  triggerChildAction() {
    if (this.childComponent) {
      this.childComponent.invalidateSize();
    }
  }

  imageChangedEvent: Event | null = null;
  croppedImage: SafeUrl = '';

  mapSearchList!: any[];
  breadCrumbItems!: Array<{}>;
  courts: CourtModel[] = [];
  courtForm!: FormGroup;
  submitted = false;
  masterSelected!: boolean;
  courtlist: any;
  bedroom: any;
  searchTerm!: string;
  formUtils: {
    courtData: CourtModel | null,
    action: string
  } = { courtData: null, action: '' };

  action!: string;
  mapData: any;

  @ViewChild('addCourt', { static: false }) addCourt?: ModalDirective;
  @ViewChild('deleteRecordModal', { static: false }) deleteRecordModal?: ModalDirective;
  deleteID: any;
  editData: any;

  searchResultsFromChild: any;
  searchInputResult: string = "";
  selectedMapData: any;

  constructor(
    private formBuilder: UntypedFormBuilder,
    public store: Store,
    private courtService: CourtService,
    private http: HttpClient,
  ) {
  }


  onSearch(item: any): void {
    //{ term:string, items:any[] }
    if (item.term.length == 0) {
      this.selectedMapData = [];
    } else {
      console.log("item type ", item.term instanceof String);
      this.searchInputResult = item.term;
    }

  }

  onSelectChange(selectedValue: any): void {
    console.log("selectedValue ", selectedValue);

    this.selectedMapData = {
      longitude: selectedValue.center.lng,
      latitude: selectedValue.center.lat
    }

  }


  fetchCourtList() {
    this.store.dispatch(fetchcourtData());
    this.store.select(selectcourtData).subscribe((data) => {
      this.courtlist = data;
      this.courts = this.courtlist.slice(0, 10);
      console.log("this.courtlist ", this.courts);
    });
  }

  currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  accesses: any = [];

  ngOnInit(): void {

    this.http.get('http://localhost:8080/api/agent/accesses/' + this.currentUser.email).subscribe((data: any) => {
      this.accesses = data;
      console.log('accesses : ', data);
    });

    this.fetchCourtList();


    this.store.select(selectMapData).subscribe((data) => {
      console.log("searchResultsFromChild ", data);
      this.searchResultsFromChild = data;
    });

    this.breadCrumbItems = [
      { label: 'Courts', active: true },
      { label: 'Court Grid', active: true }
    ];
    this.store.select(selectSelectedMapData).subscribe((data) => {
      this.mapData = data;
    });

    this.courtForm = this.formBuilder.group({
      id: ['', []],
      name: ['court1', [Validators.required, Validators.minLength(3)]],
      type: ['FIRST_INSTANCE_COURT', [Validators.required]],
      latitude: ['0.0', [Validators.required]],
      longitude: ['0.0', [Validators.required]],
    });


    document.getElementById('elmLoader')?.classList.add('d-none');


    setTimeout(() => {
      console.log("this.courtlist ", this.courtlist);

    }, 3000);
  }





  get formValue() {
    return this.courtForm.controls;
  }

  editCourtModal(court: CourtModel) {
    this.formUtils.courtData = court;
    console.log("court ", court);
    this.formUtils.action = 'edit';

    this.addCourt?.show();
    this.editData = court;
    this.courtForm.patchValue({ ...court });
    this.selectedMapData = {
      longitude: Number.parseFloat(court.longitude),
      latitude: Number.parseFloat(court.latitude)
    }
  }

  addCourtModal() {
    this.formUtils.action = 'add';
    this.addCourt?.show();
    this.courtForm.reset();
  }

  viewOnMapModal(data: any) {
    console.log("data ", data);
    this.formUtils.action = 'viewMap';
    this.addCourt?.show();

    this.selectedMapData = {
      longitude: Number.parseFloat(data.longitude),
      latitude: Number.parseFloat(data.latitude)
    }

  }

  saveCourt() {
    this.courtForm.patchValue({ latitude: this.mapData.latitude, longitude: this.mapData.longitude });

    if (this.courtForm.valid) {
      console.log("valid");
      const court = this.courtForm.value;
      if (this.formUtils.action === 'edit') {
        console.log("court edit ", court);
        this.courtService.updateData(court.id, court).subscribe((data) => {
          console.log("data ", data);
          this.fetchCourtList();
        });
      } else if (this.formUtils.action === 'add') {
        console.log("add");
        this.store.dispatch(addcourtData({ newData: court }));
      }
    }


    this.addCourt?.hide();
    this.courtForm.reset();
    this.submitted = true;

  }


  removeItem(id
    :
    any
  ) {
    this.deleteID = id;
    this.deleteRecordModal?.show();
  }


  confirmDelete() {
    console.log("this.deleteID ", this.deleteID);
    this.store.dispatch(deletecourtData({ id: this.deleteID.toString() }));
    this.deleteRecordModal?.hide();
  }

  pageChanged(event
    :
    PageChangedEvent
  ):
    void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.courts = this.courtlist.slice(startItem, endItem);
  }

  selectstatus() {
    const courtType = (document.getElementById("status-input") as HTMLInputElement).value;
    if (courtType) {
      this.courts = this.courtlist.filter((data: any) => {
        return data.type == courtType;
      });
    } else {
      this.courts = this.courtlist.slice(0, 10);
    }
  }

  searchResults: any;

  performSearch(): void {

    console.log("this.searchTerm ", this.searchTerm);
    this.searchResults = this.courtlist.filter((item: any) => {
      return item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        || item.createdBy.firstName.toLowerCase().includes(this.searchTerm.toLowerCase())
    });
    this.courts = this.searchResults.slice(0, 10);
    this.updateNoResultDisplay();
  }

  updateNoResultDisplay() {
    const noResultElement = document.getElementById('noresult') as HTMLElement;
    const paginationElement = document.getElementById('pagination-element') as HTMLElement;

    if (this.searchResults && this.courts.length == 0) {
      noResultElement.style.display = 'block';
      paginationElement.classList.add('d-none');
    } else {
      noResultElement.style.display = 'none';
      paginationElement.classList.remove('d-none');
    }
  }

  formatType(type: string) {
    return type.replaceAll("_", " ");
  }
}
