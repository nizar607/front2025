import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface UserAddress {
  street: string;
  city: string;
  state: string;
  postalCode: string;
}

interface UserPreferences {
  orderUpdates: boolean;
  promotions: boolean;
  newsletter: boolean;
}

interface User {
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  phone: string;
  orders: number;
  wishlist: number;
  address: UserAddress;
  joinDate: Date;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User = {
    firstName: 'John',
    lastName: 'Doe',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 890',
    orders: 12,
    wishlist: 5,
    address: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      postalCode: '10001'
    },
    joinDate: new Date('2023-01-15')
  };

  preferences: UserPreferences = {
    orderUpdates: true,
    promotions: false,
    newsletter: true
  };

  currentSection: string = 'profile';

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Initialize component data
  }

  getInitials(): string {
    return `${this.user.firstName[0]}${this.user.lastName[0]}`;
  }

  getMemberSince(): string {
    return this.user.joinDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }

  editAvatar(): void {
    // Implement avatar upload functionality
    console.log('Edit avatar clicked');
  }

  showSection(section: string): void {
    this.currentSection = section;
    // Implement section navigation logic
  }

  togglePreference(preference: keyof UserPreferences): void {
    this.preferences[preference] = !this.preferences[preference];
  }

  saveChanges(): void {
    // Implement save functionality
    console.log('Saving changes:', {
      user: this.user,
      preferences: this.preferences
    });
  }

  goHome(): void {
    this.router.navigate(['/home']);
  }

  toggleCart(): void {
    // Implement cart toggle functionality
    console.log('Toggle cart clicked');
  }
}
