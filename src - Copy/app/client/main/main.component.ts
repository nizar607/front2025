import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { SharedService } from '../shared-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
  encapsulation: ViewEncapsulation.None
})
export class MainComponent {

  private subscription!: Subscription;
  constructor(private sharedService: SharedService) {

  }
  ngOnInit() {

    document.getElementsByTagName('body')[0].style.overflowY = 'scroll';

  }

  ngAfterViewInit() {
    this.subscription = this.sharedService.methodCalled$.subscribe(data => {
      this.parentMethod(data);
    });


  }

  parentMethod(data?: any) {
    console.log('Parent method called with data:', data);
    if (data == true) {
      document.getElementsByTagName('body')[0].style.overflowY = 'hidden';
    }else{
      document.getElementsByTagName('body')[0].style.overflowY ='scroll'; 
    }
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
