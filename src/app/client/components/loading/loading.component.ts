import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-client-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class ClientLoadingComponent implements OnInit {
  message: string = 'Loading...';
  uriParam: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Access the parent route parameter (:uriParam)
    this.route.parent?.paramMap.subscribe(params => {
      this.uriParam = params.get('uriParam');
      console.log('Fetched uriParam in LoadingComponent:', this.uriParam);
      // TODO: Use uriParam to load content based on the route if necessary
    });
  }
}