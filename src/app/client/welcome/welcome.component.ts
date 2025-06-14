import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {

  constructor(private router: Router) { }

  selectTemplate(version: string): void {
    // Store the selected template preference (you can use localStorage or a service)
    localStorage.setItem('selectedTemplate', version);
    
    // Navigate to the selected homepage template
    if (version === 'v1') {
      this.router.navigate(['/client']);
    } else if (version === 'v2') {
      this.router.navigate(['/client/v2']);
    } else if (version === 'v3') {
      this.router.navigate(['/client/v3']);
    }
  }

}
