import { Component } from '@angular/core';
import { SharedService } from '../shared-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private sharedService: SharedService,private router:Router) { }

  ngOnInit() {
  }

  navigateToHome(){
    this.callParentMethod();
    this.router.navigate(['/client']);
  }

  callParentMethod() {
    this.sharedService.disableScroll(false);
  }

}
