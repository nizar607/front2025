import { Component } from '@angular/core';
import { SharedService } from '../shared-service.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-room3d',
  templateUrl: './room3d.component.html',
  styleUrl: './room3d.component.css'
})
export class Room3dComponent {

  url!: string;
  constructor(private sharedService: SharedService, private sanitizer: DomSanitizer) {
    const _url =`http://localhost:9000/?token=${localStorage.getItem("token") || ""}`; 
    this.url = sanitizer.bypassSecurityTrustResourceUrl(_url) as string;
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.callParentMethod();
  }

  callParentMethod() {
    this.sharedService.disableScroll(true);
  }

}
