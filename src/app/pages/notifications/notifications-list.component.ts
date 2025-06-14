import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NotificationService, Notification } from '../../core/services/notification/notification.service';

@Component({
  selector: 'app-notifications-list',
  templateUrl: './notifications-list.component.html',
  styleUrls: ['./notifications-list.component.scss']
})
export class NotificationsListComponent implements OnInit, OnDestroy {
  notifications: Notification[] = [];
  filteredNotifications: Notification[] = [];
  selectedFilter: string = 'all';
  isLoading: boolean = false;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;

  // Make Math available in template
  Math = Math;

  private destroy$ = new Subject<void>();
  private _paginationArray: number[] = [];

  readonly notificationTypes = [
    { value: 'all', label: 'All Notifications' },
    { value: 'article', label: 'Articles' },
    { value: 'category', label: 'Categories' },
    { value: 'agent', label: 'Agents' },
    { value: 'message', label: 'Messages' }
  ];

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.loadNotifications();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadNotifications(): void {
    this.isLoading = true;
    this.notificationService.getNotifications()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (notifications) => {
          this.notifications = notifications;
          this.applyFilter();
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading notifications:', error);
          this.isLoading = false;
          // You might want to show a user-friendly error message here
        }
      });
  }

  applyFilter(): void {
    if (this.selectedFilter === 'all') {
      this.filteredNotifications = [...this.notifications];
    } else {
      this.filteredNotifications = this.notifications.filter(
        notification => notification.type === this.selectedFilter
      );
    }
    this.totalItems = this.filteredNotifications.length;
    this.currentPage = 1; // Reset to first page when filter changes
    this.updatePaginationArray();
  }

  onFilterChange(filter: string): void {
    this.selectedFilter = filter;
    this.applyFilter();
  }

  markAsRead(notificationId: number): void {
    this.notificationService.markAsRead(notificationId)

  }

  markAllAsRead(): void {
    this.notificationService.markAllAsRead()

  }

  deleteNotification(notificationId: number): void {
    if (confirm('Are you sure you want to delete this notification?')) {
      this.notificationService.deleteNotification(notificationId)
    }
  }

  refreshNotifications(): void {
    this.loadNotifications();
  }

  getNotificationIcon(type: string): string {
    const iconMap: { [key: string]: string } = {
      'article': 'bi-file-text',
      'category': 'bi-folder',
      'agent': 'bi-person',
      'message': 'bi-chat-dots',
      'default': 'bi-bell'
    };
    return iconMap[type] || iconMap['default'];
  }

  getNotificationColor(type: string): string {
    const colorMap: { [key: string]: string } = {
      'article': 'text-primary',
      'category': 'text-success',
      'agent': 'text-info',
      'message': 'text-warning',
      'default': 'text-secondary'
    };
    return colorMap[type] || colorMap['default'];
  }

  getNotificationBgClass(type: string): string {
    const bgMap: { [key: string]: string } = {
      'article': 'bg-primary',
      'category': 'bg-success',
      'agent': 'bg-info',
      'message': 'bg-warning',
      'default': 'bg-secondary'
    };
    return `avatar-sm rounded-circle ${bgMap[type] || bgMap['default']} d-flex align-items-center justify-content-center`;
  }

  getNotificationBadgeClass(type: string): string {
    const badgeMap: { [key: string]: string } = {
      'article': 'badge bg-primary',
      'category': 'badge bg-success',
      'agent': 'badge bg-info',
      'message': 'badge bg-warning',
      'default': 'badge bg-secondary'
    };
    return badgeMap[type] || badgeMap['default'];
  }

  getTimeAgo(timestamp: Date): string {
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffInMs = now.getTime() - notificationTime.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMinutes < 1) {
      return 'Just now';
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else {
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    }
  }

  trackByNotificationId(index: number, notification: Notification): number {
    return notification.id;
  }

  // Pagination methods
  get paginatedNotifications(): Notification[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredNotifications.slice(startIndex, endIndex);
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.currentPage = page;
    }
  }

  getPaginationArray(): number[] {
    if (this._paginationArray.length !== this.totalPages) {
      this.updatePaginationArray();
    }
    return this._paginationArray;
  }

  private updatePaginationArray(): void {
    this._paginationArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  // Helper method to get count for specific notification type
  getNotificationTypeCount(type: string): number {
    if (type === 'all') {
      return this.notifications.length;
    }
    return this.notifications.filter(n => n.type === type).length;
  }
}