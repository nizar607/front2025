import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import { UserProfileService } from 'src/app/core/services/user.service';
import { selectprofileData } from 'src/app/store/Profile/profile-selector';
import { fetchprofileData, updateprofileData } from 'src/app/store/Profile/profile.action';


interface UserPreferences {
  newsletter: boolean;
}

interface User {
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  image: string;
  subscribed:boolean;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userForm: FormGroup;

  user: User = {
    firstName: 'John',
    lastName: 'Doe',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phoneNumber: '+1 234 567 890',
    address: "Street Address: Shop 14, Bridge Market, Sector 17-D",
    image: "",
    subscribed:true
  };

  preferences: UserPreferences = {
    newsletter: true
  };

  currentSection: string = 'profile';
  showImageModal: boolean = false;
  isLoading: boolean = true;
  userDataLoaded: boolean = false;
  userImage: string = '';

  constructor(
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private router: Router,
    private tokenStorage: TokenStorageService,
    private userService: UserProfileService,
    private store: Store
  ) {
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[+]?[0-9\s\-\(\)]+$/)]],
      address: ['', [Validators.required, Validators.minLength(5)]],
      image: ['']
    });
  }

  ngOnInit(): void {
    // Initialize form with default values first
    this.initializeForm();
    // Then load user data which will update the form
    this.loadUserData();
  }

  initializeForm(): void {
    this.userForm.patchValue({
      firstName: this.user?.firstName,
      lastName: this.user?.lastName,
      email: this.user?.email,
      phoneNumber: this.user?.phoneNumber,
      address: this.user?.address,
      image: this.user?.image
    });

    this.preferences.newsletter = this.user.subscribed;
  }

  getInitials(): string {
    if (!this.user || !this.user.firstName || !this.user.lastName) {
      return 'JD'; // Default initials
    }
    return `${this.user.firstName.charAt(0)}${this.user.lastName.charAt(0)}`;
  }

  getMemberSince(): string {
    return "";
    // this.user.createdAt.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }

  editAvatar(): void {
    this.showImageModal = true;
  }

  closeImageModal(): void {
    this.showImageModal = false;
    this.imageChangedEvent = null;
  }

  getUserImage(): string | null {
    // Prioritize cropped image for immediate preview
    if (this.croppedImage) {
      return this.croppedImage as string;
    }
    if (this.userImage) {
      return `http://localhost:8080/api/files/${this.userImage}`;
    }
    return null; // Return null to show initials instead
  }

  shouldShowInitials(): boolean {
    return !this.croppedImage && !this.userImage;
  }

  showSection(section: string): void {
    this.currentSection = section;
    // Implement section navigation logic
  }

  togglePreference(preference: keyof UserPreferences): void {
    this.preferences[preference] = !this.preferences[preference];
  }

  saveChanges(): void {
    if (this.userForm.valid) {
      const formValues = this.userForm.value;

      // Create FormData object
      const formData = new FormData();

      // Append form fields to FormData
      formData.append('firstName', formValues.firstName || '');
      formData.append('lastName', formValues.lastName || '');
      formData.append('email', formValues.email || '');
      formData.append('phoneNumber', formValues.phoneNumber || '');
      formData.append('address', formValues.address || '');
      // Handle image file - only send actual files, not strings
      if (formValues.image && formValues.image instanceof File) {
        console.log("here image condition");
        formData.append('image', formValues.image);
      }
      console.log(this.preferences.newsletter);
      formData.append('subscribed', String(this.preferences.newsletter));
      // Update user object with form data
      this.user = { ...this.user, ...formValues };
      this.user.name = `${formValues.firstName} ${formValues.lastName}`;

      // Here you would typically send the updated user data to your backend
      console.log('Saving user data:', this.user);
      console.log('Saving preferences:', this.preferences);

      this.store.dispatch(updateprofileData({ updatedData: formData }));
      // Show success message or handle errors
    } else {
      // Mark all fields as touched to show validation errors
      this.userForm.markAllAsTouched();
      alert('Please fill in all required fields correctly.');
    }
  }

  // Helper method to check if a field has errors
  hasError(fieldName: string, errorType?: string): boolean {
    const field = this.userForm.get(fieldName);
    if (!field) return false;

    if (errorType) {
      return field.hasError(errorType) && (field.dirty || field.touched);
    }
    return field.invalid && (field.dirty || field.touched);
  }

  // Helper method to get error message
  getErrorMessage(fieldName: string): string {
    const field = this.userForm.get(fieldName);
    if (!field || !field.errors) return '';

    if (field.errors['required']) return `${fieldName} is required`;
    if (field.errors['email']) return 'Please enter a valid email address';
    if (field.errors['minlength']) return `${fieldName} must be at least ${field.errors['minlength'].requiredLength} characters`;
    if (field.errors['pattern']) return 'Please enter a valid phone number';

    return 'Invalid input';
  }

  goHome(): void {
    this.router.navigate(['/home']);
  }

  toggleCart(): void {
    // Implement cart toggle functionality
    console.log('Toggle cart clicked');
  }


  imageChangedEvent: Event | null = null;
  croppedImage: SafeUrl = '';
  imageURL: any;
  file!: File;
  previewUrl: SafeUrl | null = null;

  get formValue() {
    return this.userForm.controls;
  }

  loadUserData(): void {
    // Load user data from TokenStorageService or API
    this.isLoading = true;
    this.store.dispatch(fetchprofileData());

    this.store.select(selectprofileData).subscribe((data) => {
      if (data) {
        this.user = data;
        this.userImage = data.image || ''; // Set the userImage variable
        this.userDataLoaded = true;
        this.isLoading = false;
        // Update form with loaded data
        this.initializeForm();
        console.log("User data loaded: ", data);
      } else {
        // Keep default user data if no data from backend
        this.isLoading = false;
        this.userDataLoaded = true;
        console.log("Using default user data");
      }
    }, (error) => {
      console.error('Error loading user data:', error);
      this.isLoading = false;
      this.userDataLoaded = true; // Use default data on error
    });
  }

  fileChangeEvent(event: Event): void {
    this.imageChangedEvent = event;
  }


  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl + "");

    // Convert Blob to File
    const file = new File([event.blob!], "croppedImage.png", { type: event.blob!.type });
    console.log("patched here ")
    this.userForm.patchValue({
      image: file
    });
    console.log(this.userForm.value)
  }

  saveImage(): void {
    if (this.croppedImage) {
      // Don't update userImage here - let croppedImage take precedence for preview
      // userImage should only be updated after successful save to backend
      this.closeImageModal();
    }
  }

  imageLoaded(image: LoadedImage) {
    // show cropper
  }

  cropperReady() {
    // Cropper ready
  }

  loadImageFailed() {
    // Load failed
  }

}
