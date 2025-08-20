import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../core/services/auth.service';

@Component({
  selector: 'app-client-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class ClientLoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthenticationService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    // Redirect if already logged in
    if (this.authService.currentUserValue) {
      this.router.navigate(['/client']);
    }
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.error = '';

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService.login(this.f['email'].value, this.f['password'].value)
      .subscribe({
        next: (response) => {
          this.router.navigate(['/client']);
        },
        error: (error) => {
          this.error = error.error?.message || 'Login failed. Please try again.';
          this.loading = false;
        }
      });
  }

  navigateToRegister() {
    this.router.navigate(['/client/register']);
  }
}