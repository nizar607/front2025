import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NotificationService, Notification } from '../../core/services/notification/notification.service';
import * as StompJs from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit, OnDestroy {
  // notifications: Notification[] = [];
  // unreadCount: number = 0;
  // filteredNotifications: Notification[] = [];
  // selectedFilter: string = 'all';
  // isLoading: boolean = false;

  // private destroy$ = new Subject<void>();

  // readonly notificationTypes = [
  //   { value: 'all', label: 'All' },
  //   { value: 'article', label: 'Articles' },
  //   { value: 'category', label: 'Categories' },
  //   { value: 'agent', label: 'Agents' },
  //   { value: 'message', label: 'Messages' }
  // ];

  constructor(private notificationService: NotificationService) { }

  stompClient: any = null;

  connect() {

    try {
      // Create SockJS and STOMP client
      const socket = new SockJS('http://localhost:8080/ws');
      this.stompClient = StompJs.Stomp.over(socket);

      // Disable debug logs
      this.stompClient.debug = function (msg: any) {
        console.log(msg);
      };

      // Connect
      this.stompClient.connect({},
        (frame: any) => {
          // Connected successfully
          console.log('Connected to WebSocket', 'received');

          // Subscribe to topics
          this.stompClient.subscribe('/topic/notifications', function (message: any) {
            console.log(`Received from /topic/notifications: ${message.body}`, 'received');
            try {
              const data = JSON.parse(message.body);
              console.log(`Parsed notification: ${JSON.stringify(data)}`, 'received');
            } catch (e) {
              console.log('Not JSON data');
            }
          });

          // Subscribe to broadcast notifications
          this.stompClient.subscribe('/topic/notifications/broadcast', function (message: any) {
            console.log(`Received from /topic/notifications/broadcast: ${message.body}`, 'received');
            try {
              const data = JSON.parse(message.body);
              console.log(`Parsed broadcast: ${JSON.stringify(data)}`, 'received');
            } catch (e) {
              console.log('Not JSON data');
            }
          });

          // Subscribe to user-specific notifications
          this.stompClient.subscribe('/user/queue/notifications', function (message: any) {
            console.log(`Received from /user/queue/notifications: ${message.body}`, 'received');
            try {
              const data = JSON.parse(message.body);
              console.log(`Parsed user notification: ${JSON.stringify(data)}`, 'received');
            } catch (e) {
              console.log('Not JSON data');
            }
          });

          this.stompClient.subscribe('/user/queue/notification-updates', function (message: any) {
            console.log(`Received from /user/queue/notification-updates: ${message.body}`, 'received');
          });

          // Subscribe to category-specific notifications
          this.stompClient.subscribe('/topic/category', function (message: any) {
            console.log(`Received from /topic/category: ${message.body}`, 'received');
            try {
              const data = JSON.parse(message.body);
              console.log(`Parsed category notification: ${JSON.stringify(data)}`, 'received');
            } catch (e) {
              console.log('Not JSON data');
            }
          });
        },
        (error: any) => {
          // Connection error
          console.log(`Connection error: ${error}`, 'error');

        }
      );
    } catch (e:any) {
      console.log(`Error initializing connection: ${e.message}`, 'error');
      console.error(e);
    }
  }

  // Disconnect from WebSocket
  disconnect() {
    if (this.stompClient) {
      this.stompClient.disconnect(function () {
        console.log('Disconnected from WebSocket');
      });
    }
  }


  ngOnInit(): void {
    // this.subscribeToNotifications();
    // this.subscribeToUnreadCount();
    this.connect();
  }

  ngOnDestroy(): void {
    // this.destroy$.next();
    // this.destroy$.complete();
  }

  // private subscribeToNotifications(): void {
  //   this.notificationService.getNotifications()
  //     .pipe(takeUntil(this.destroy$))
  //     .subscribe(notifications => {
  //       this.notifications = notifications;
  //       this.applyFilter();
  //     });
  // }

  // private subscribeToUnreadCount(): void {
  //   this.notificationService.getUnreadCount()
  //     .pipe(takeUntil(this.destroy$))
  //     .subscribe(count => {
  //       this.unreadCount = count;
  //     });
  // }

  // markAsRead(id: number, event?: Event): void {
  //   if (event) {
  //     event.stopPropagation();
  //   }
  //   this.notificationService.markAsRead(id);
  // }

  // markAllAsRead(): void {
  //   this.notificationService.markAllAsRead();
  // }

  // deleteNotification(id: number, event?: Event): void {
  //   if (event) {
  //     event.stopPropagation();
  //   }
  //   if (confirm('Are you sure you want to delete this notification?')) {
  //     this.notificationService.deleteNotification(id);
  //   }
  // }

  // onFilterChange(filter: string): void {
  //   this.selectedFilter = filter;
  //   this.applyFilter();
  // }

  // private applyFilter(): void {
  //   if (this.selectedFilter === 'all') {
  //     this.filteredNotifications = [...this.notifications];
  //   } else {
  //     this.filteredNotifications = this.notifications.filter(
  //       notification => notification.type === this.selectedFilter
  //     );
  //   }
  // }

  // refreshNotifications(): void {
  //   this.isLoading = true;
  //   this.notificationService.loadNotifications();
  //   // Reset loading state after a short delay
  //   setTimeout(() => {
  //     this.isLoading = false;
  //   }, 1000);
  // }

  // getNotificationIcon(type: string): string {
  //   switch(type) {
  //     case 'article': return 'bi-file-text';
  //     case 'category': return 'bi-folder';
  //     case 'agent': return 'bi-person-badge';
  //     case 'message': return 'bi-chat-dots';
  //     default: return 'bi-bell';
  //   }
  // }

  // getNotificationColor(type: string): string {
  //   switch(type) {
  //     case 'article': return 'text-primary';
  //     case 'category': return 'text-success';
  //     case 'agent': return 'text-warning';
  //     case 'message': return 'text-danger';
  //     default: return 'text-secondary';
  //   }
  // }

  // getNotificationBadgeClass(type: string): string {
  //   switch(type) {
  //     case 'article': return 'badge bg-primary';
  //     case 'category': return 'badge bg-success';
  //     case 'agent': return 'badge bg-warning';
  //     case 'message': return 'badge bg-danger';
  //     default: return 'badge bg-secondary';
  //   }
  // }

  // getTimeAgo(date: Date): string {
  //   const now = new Date();
  //   const diffMs = now.getTime() - new Date(date).getTime();
  //   const diffSec = Math.round(diffMs / 1000);
  //   const diffMin = Math.round(diffSec / 60);
  //   const diffHour = Math.round(diffMin / 60);
  //   const diffDay = Math.round(diffHour / 24);
  //   const diffWeek = Math.round(diffDay / 7);
  //   const diffMonth = Math.round(diffDay / 30);

  //   if (diffSec < 60) {
  //     return diffSec <= 1 ? 'just now' : `${diffSec} sec ago`;
  //   } else if (diffMin < 60) {
  //     return diffMin === 1 ? '1 min ago' : `${diffMin} min ago`;
  //   } else if (diffHour < 24) {
  //     return diffHour === 1 ? '1 hour ago' : `${diffHour} hours ago`;
  //   } else if (diffDay < 7) {
  //     return diffDay === 1 ? '1 day ago' : `${diffDay} days ago`;
  //   } else if (diffWeek < 4) {
  //     return diffWeek === 1 ? '1 week ago' : `${diffWeek} weeks ago`;
  //   } else {
  //     return diffMonth === 1 ? '1 month ago' : `${diffMonth} months ago`;
  //   }
  // }

  // getFormattedTimestamp(date: Date): string {
  //   return new Date(date).toLocaleString();
  // }

  // isWebSocketConnected(): boolean {
  //   return this.notificationService.isWebSocketConnected();
  // }

  // reconnectWebSocket(): void {
  //   this.notificationService.reconnectWebSocket();
  // }

  // trackByNotificationId(index: number, notification: Notification): number {
  //   return notification.id;
  // }

  // getUnreadNotificationsCount(): number {
  //   return this.filteredNotifications.filter(n => !n.read).length;
  // }

  // hasUnreadNotifications(): boolean {
  //   return this.unreadCount > 0;
  // }
}