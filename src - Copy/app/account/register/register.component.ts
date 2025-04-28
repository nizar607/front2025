import {Component} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';

// Register Auth
import {AuthenticationService} from 'src/app/core/services/auth.service';
import {UserProfileService} from 'src/app/core/services/user.service';
import {Register} from 'src/app/store/Authentication/authentication.actions';
import {NGXLogger} from "ngx-logger";
import { passwordMatchValidator } from 'src/app/core/shared/SharedForm';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

// Register Component
export class RegisterComponent {
  // Login Form
  signupForm!: UntypedFormGroup;
  submitted = false;
  successmsg = false;
  error = '';
  // set the current year
  year: number = new Date().getFullYear();

  fieldTextType!: boolean;

  constructor(
    private formBuilder: UntypedFormBuilder,
    public store: Store,
    private logger:NGXLogger
  ) {
  }

  ngOnInit(): void {
    /**
     * Form Validatyion
     */
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$')]],
      confirmPassword: ['', Validators.required],
    }, {
      validators: passwordMatchValidator('password', 'confirmPassword') }
  );
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.signupForm.controls;
  }

  /**
   * Register submit form
   */
  onSubmit() {
    this.submitted = true;
    console.log("user here",this.signupForm.value);

    if (this.signupForm.valid) {

      const email = this.f['email'].value;
      const firstName = this.f['firstName'].value;
      const lastName = this.f['lastName'].value;
      const password = this.f['password'].value;
      const confirmPassword = this.f['confirmPassword'].value;

      if (password == confirmPassword) {
        
        this.store.dispatch(Register({
          email: email,
          firstName: firstName,
          lastName: lastName,
          password: password,
          roles:["ROLE_CLIENT"]
        }
      ));
      }
    }
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

}
