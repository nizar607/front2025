import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { Store, select } from '@ngrx/store';
import { createCompanyWithImage } from '../../store/Company/company.action';
import { selectDataLoading, selectcompanyData } from '../../store/Company/company-selector';
import { Observable, combineLatest } from 'rxjs';
import { filter, take } from 'rxjs/operators';

@Component({
  selector: 'app-profile-setup',
  templateUrl: './profile-setup.component.html',
  styleUrls: ['./profile-setup.component.scss']
})
export class ProfileSetupComponent {
  profileForm: FormGroup;
  croppedImage: SafeUrl = '';
  imageChangedEvent: Event | null = null;


  constructor(
    private router: Router,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private store: Store
  ) {
    this.profileForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      address: [''],
      website: ['',],
      image: [null]
    });
  }

  goToTemplates(): void {
    if (this.profileForm.valid) {

      // Prepare company data from form
      const companyData = {
        name: this.profileForm.get('name')?.value,
        email: this.profileForm.get('email')?.value,
        phoneNumber: this.profileForm.get('phoneNumber')?.value,
        address: this.profileForm.get('address')?.value,
        website: this.profileForm.get('website')?.value
      };

      console.log(companyData);

      
      // Get the cropped image file
      const imageFile = this.profileForm.get('image')?.value;

      // Dispatch the chained action
      this.store.dispatch(createCompanyWithImage({
        companyData,
        imageFile
      }));

      // Subscribe to store state to navigate only on success
      combineLatest([
        this.store.pipe(select(selectDataLoading)),
        this.store.pipe(select(selectcompanyData))
      ]).pipe(
        filter(([loading, companies]) => !loading && companies.length > 0),
        take(1)
      ).subscribe(() => {
        // Save profile data to localStorage as backup
        const profileData = this.profileForm.value;
        localStorage.setItem('profileData', JSON.stringify(profileData));

        // Mark profile as completed and navigate to templates
        localStorage.setItem('hasProfile', 'true');
        this.router.navigate(['/templates']);
      });
    } else {
      // Mark invalid fields
      this.profileForm.markAllAsTouched();
    }
  }


  get formValue() {
    return this.profileForm.controls;
  }

  fileChangeEvent(event: Event): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl + "");

    // Convert Blob to File
    const file = new File([event.blob!], "croppedImage.png", { type: event.blob!.type });

    this.profileForm.patchValue({
      image: file
    });
  }

  loadImageFailed() {
    // Load failed
  }

  cropperReady() {
    // Cropper ready
  }

  imageLoaded(image: LoadedImage) {
    // show cropper
  }


}