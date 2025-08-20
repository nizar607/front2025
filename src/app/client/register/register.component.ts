import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../core/services/auth.service';

@Component({
  selector: 'app-client-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class ClientRegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthenticationService
  ) {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  ngOnInit(): void {
    // Redirect if already logged in
    if (this.authService.currentUserValue) {
      this.router.navigate(['/client']);
    }
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }
    return null;
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.error = '';

    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService.register(
      this.f['email'].value,
      this.f['firstName'].value,
      this.f['lastName'].value,
      this.f['password'].value,
      ['user'] // Default role for client users
    ).subscribe({
      next: (response) => {
        this.router.navigate(['/client/login']);
      },
      error: (error) => {
        this.error = error.error?.message || 'Registration failed. Please try again.';
        this.loading = false;
      }
    });
  }

  navigateToLogin() {
    this.router.navigate(['/client/login']);
  }
}