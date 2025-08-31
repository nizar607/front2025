import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectVersionByWebsite } from 'src/app/store/Company/company-selector';
import { fetchcompanyByWebsite, fetchVersionByWebsite } from 'src/app/store/Company/company.action';

@Component({
  selector: 'app-client-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class ClientLoadingComponent implements OnInit {
  message: string = 'Loading...';
  uriParam: string | null = null;

  constructor(private route: ActivatedRoute,private store : Store,private router: Router) {}

  ngOnInit(): void {
    // Access the parent route parameter (:uriParam)
    this.route.parent?.paramMap.subscribe(params => {
      this.uriParam = params.get('uriParam');
      console.log('Fetched uriParam in LoadingComponent:', this.uriParam);
      this.store.dispatch(fetchVersionByWebsite({ website: this.uriParam || '' }));
    });

    this.store.select(selectVersionByWebsite).subscribe(version => {
      if (version) {
        this.message = version;
        this.router.navigate([this.message], { relativeTo: this.route });
      }
    });


  }
}