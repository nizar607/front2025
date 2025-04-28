import { Component } from '@angular/core';
import { SharedService } from '../shared-service.service';

@Component({
  selector: 'app-room3d',
  templateUrl: './room3d.component.html',
  styleUrl: './room3d.component.css'
})
export class Room3dComponent {
  constructor(private sharedService: SharedService) {

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
