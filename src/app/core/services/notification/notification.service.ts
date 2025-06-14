import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, timer, EMPTY } from 'rxjs';
import { catchError, retry, retryWhen, delay, take, finalize } from 'rxjs/operators';
import { GlobalComponent } from '../../../global-component';
import * as SockJS from 'sockjs-client';
import { Stomp, CompatClient, IMessage } from '@stomp/stompjs';

export interface Notification {
  id: number;
  type: 'article' | 'category' | 'agent' | 'message' | 'ARTICLE_CREATED' | 'CATEGORY_CREATED';
  message: string;
  timestamp: Date;
  read: boolean;
  recipientId?: string;
  from?: string;
  text?: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService implements OnDestroy {
  private notifications = new BehaviorSubject<Notification[]>([]);
  private unreadCount = new BehaviorSubject<number>(0);
  private stompClient: CompatClient | null = null;
  private reconnectInterval = 5000; // 5 seconds
  private maxReconnectAttempts = 5;
  private reconnectAttempts = 0;
  private isConnected = false;

  constructor(private http: HttpClient) {
    this.loadNotifications();
    this.connectWebSocket();
  }

  getNotifications(): Observable<Notification[]> {
    return this.notifications.asObservable();
  }

  getUnreadCount(): Observable<number> {
    return this.unreadCount.asObservable();
  }

  private connectWebSocket(): void {
    if (this.stompClient) {
      this.stompClient.deactivate();
    }

    try {
      // Create SockJS connection - use the same URL as your working HTML
      const socket = new SockJS('http://localhost:8080/ws');
      
      // Create STOMP client
      this.stompClient = Stomp.over(socket);
      
      // Enable debug logs for troubleshooting
      this.stompClient.debug = (str) => {
        console.log('STOMP Debug:', str);
      };

      // Set up connection callbacks
      this.stompClient.onConnect = (frame) => {
        console.log('WebSocket connected:', frame);
        this.isConnected = true;
        this.reconnectAttempts = 0;
        
        // Subscribe to the CORRECT topics that match your WebSocket controller
        
        // 1. Main public topic - where your @SendTo("/topic/public") sends messages
        this.stompClient?.subscribe('/topic/public', (message: IMessage) => {
          console.log('✅ Received from /topic/public:', message.body);
          this.handleIncomingMessage(message.body, 'public_chat');
        });
        
        // 2. User-specific replies (from your @SendToUser("/queue/reply") methods)
        this.stompClient?.subscribe('/user/queue/reply', (message: IMessage) => {
          console.log('✅ Received from /user/queue/reply:', message.body);
          this.handleIncomingMessage(message.body, 'user_reply');
        });
        
        // 3. General notifications topic (if backend sends here)
        this.stompClient?.subscribe('/topic/notifications', (message: IMessage) => {
          console.log('✅ Received from /topic/notifications:', message.body);
          this.handleIncomingMessage(message.body, 'topic_notifications');
        });
        
        // 4. User-specific notifications from NotificationService
        this.stompClient?.subscribe('/user/queue/notifications', (message: IMessage) => {
          console.log('✅ Received from /user/queue/notifications:', message.body);
          this.handleIncomingMessage(message.body, 'user_notifications');
        });
        
        // 5. Broadcast notifications
        this.stompClient?.subscribe('/topic/notifications/broadcast', (message: IMessage) => {
          console.log('✅ Received from /topic/notifications/broadcast:', message.body);
          this.handleIncomingMessage(message.body, 'broadcast_notifications');
        });

        console.log('📡 Subscribed to all notification channels');
      };

      this.stompClient.onDisconnect = (frame) => {
        console.log('❌ WebSocket disconnected:', frame);
        this.isConnected = false;
        this.handleReconnection();
      };

      this.stompClient.onStompError = (frame) => {
        console.error('❌ STOMP error:', frame);
        this.isConnected = false;
        this.handleReconnection();
      };

      this.stompClient.onWebSocketError = (error) => {
        console.error('❌ WebSocket error:', error);
        this.isConnected = false;
        this.handleReconnection();
      };

      // Connect to WebSocket
      this.stompClient.connect({}, 
        (frame: any) => {
          // Connection success is handled by onConnect above
        },
        (error: any) => {
          console.error('❌ Connection error:', error);
          this.isConnected = false;
          this.handleReconnection();
        }
      );

    } catch (error) {
      console.error('❌ Error initializing WebSocket connection:', error);
      this.handleReconnection();
    }
  }

  private handleIncomingMessage(messageBody: string, source: string): void {
    try {
      const data = JSON.parse(messageBody);
      console.log(`📨 Parsed message from ${source}:`, data);
      
      // Always add as notification for now to debug
      console.log('🔍 Processing message as notification...');
      this.addNewNotification(data, source);
      
    } catch (error) {
      console.error('❌ Error parsing message:', error, 'Raw message:', messageBody);
      // Even if parsing fails, create a notification with the raw message
      this.addNewNotification({
        message: messageBody,
        type: 'message',
        from: source
      }, source);
    }
  }

  private isNotificationMessage(data: any): boolean {
    // Check if the message is a notification based on your controller's response structure
    return (
      data.type === 'NOTIFICATION' ||
      data.from === 'SYSTEM' ||
      data.text ||
      data.message ||
      data.type === 'CATEGORY_CREATED' ||
      data.type === 'ARTICLE_CREATED'
    );
  }

  private addNewNotification(data: any, source: string): void {
    console.log('➕ Adding new notification from', source, ':', data);
    
    const currentNotifications = this.notifications.value;
    
    // Create a proper notification object that matches your Message structure
    const newNotification: Notification = {
      id: data.id || Date.now(),
      type: this.mapNotificationType(data, source),
      message: this.extractMessage(data, source),
      timestamp: new Date(),
      read: false,
      recipientId: data.recipientId || data.recipient,
      from: data.from || data.sender || source,
      text: data.text || data.content
    };
    
    // Add new notification to the beginning of the array
    const updatedNotifications = [newNotification, ...currentNotifications];
    this.notifications.next(updatedNotifications);
    this.updateUnreadCount(updatedNotifications);
    
    console.log('✅ Notification added. Total notifications:', updatedNotifications.length);
    console.log('📋 Current notifications:', updatedNotifications);
    
    // Show browser notification if supported
    this.showBrowserNotification(newNotification);
  }

  private mapNotificationType(data: any, source: string): Notification['type'] {
    // Check explicit type first
    if (data.type) {
      return data.type;
    }
    
    // Determine type based on source and content
    if (source === 'user_reply' || source === 'public_chat') {
      return 'message';
    }
    
    // Check message content for type hints
    const messageText = (data.text || data.message || data.content || '').toLowerCase();
    if (messageText.includes('category')) {
      return 'CATEGORY_CREATED';
    } else if (messageText.includes('article')) {
      return 'ARTICLE_CREATED';
    } else if (messageText.includes('agent')) {
      return 'agent';
    }
    
    return 'message';
  }

  private extractMessage(data: any, source: string): string {
    // Try different message fields
    const message = data.text || data.message || data.content;
    if (message) {
      return message;
    }
    
    // If no direct message, create one based on the data
    if (data.sender && data.type) {
      return `${data.type} from ${data.sender}`;
    }
    
    // Fallback to JSON representation
    return JSON.stringify(data);
  }

  private showBrowserNotification(notification: Notification): void {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('New Notification', {
        body: notification.message,
        icon: '/assets/notification-icon.png' // Add your icon path
      });
    }
  }

  // Method to send category creation notification
  sendCategoryNotification(categoryName: string, categoryDescription: string): void {
    if (!this.stompClient || !this.isConnected) {
      console.warn('⚠️ STOMP client is not connected. Cannot send category notification.');
      return;
    }

    const categoryData = {
      categoryName: categoryName,
      categoryDescription: categoryDescription
    };

    console.log('📤 Sending category notification:', categoryData);
    
    this.stompClient.publish({
      destination: '/app/category.created',
      body: JSON.stringify(categoryData)
    });
  }

  // Method to send article creation notification
  sendArticleNotification(articleTitle: string, articleSummary: string, categoryName: string): void {
    if (!this.stompClient || !this.isConnected) {
      console.warn('⚠️ STOMP client is not connected. Cannot send article notification.');
      return;
    }

    const articleData = {
      articleTitle: articleTitle,
      articleSummary: articleSummary,
      categoryName: categoryName
    };

    console.log('📤 Sending article notification:', articleData);
    
    this.stompClient.publish({
      destination: '/app/article.created',
      body: JSON.stringify(articleData)
    });
  }

  // Method to send broadcast notification
  sendBroadcastNotification(message: string): void {
    if (!this.stompClient || !this.isConnected) {
      console.warn('⚠️ STOMP client is not connected. Cannot send broadcast notification.');
      return;
    }

    const notificationData = {
      message: message,
      type: 'BROADCAST'
    };

    console.log('📤 Sending broadcast notification:', notificationData);
    
    this.stompClient.publish({
      destination: '/app/notification.broadcast',
      body: JSON.stringify(notificationData)
    });
  }

  private handleReconnection(): void {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(`🔄 Attempting to reconnect WebSocket (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`);
      
      timer(this.reconnectInterval).subscribe(() => {
        this.connectWebSocket();
      });
    } else {
      console.error('❌ Max reconnection attempts reached. WebSocket connection failed.');
    }
  }

  // Request notification permission on service initialization
  requestNotificationPermission(): void {
    if ('Notification' in window && Notification.permission !== 'granted' && Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        console.log('🔔 Notification permission:', permission);
      });
    }
  }

  // Rest of your existing methods remain the same...
  loadNotifications(): void {
    this.http.get<Notification[]>(`${GlobalComponent.API_URL}notifications`).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.error('Error loading notifications:', error);
        // Load mock data as fallback
        this.loadMockNotifications();
        return EMPTY;
      })
    ).subscribe(
      (data) => {
        const notifications = data.map(notification => ({
          ...notification,
          timestamp: new Date(notification.timestamp)
        }));
        this.notifications.next(notifications);
        this.updateUnreadCount(notifications);
      }
    );
  }

  markAsRead(id: number): void {
    this.http.put(`${GlobalComponent.API_URL}notifications/${id}/read`, {}).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error marking notification as read:', error);
        this.markAsReadLocally(id);
        return EMPTY;
      })
    ).subscribe(() => {
      this.markAsReadLocally(id);
    });
  }

  markAllAsRead(): void {
    this.http.put(`${GlobalComponent.API_URL}notifications/mark-all-read`, {}).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error marking all notifications as read:', error);
        this.markAllAsReadLocally();
        return EMPTY;
      })
    ).subscribe(() => {
      this.markAllAsReadLocally();
    });
  }

  private markAsReadLocally(id: number): void {
    this.updateNotificationStatus(id, true);
  }

  private markAllAsReadLocally(): void {
    const currentNotifications = this.notifications.value;
    const updatedNotifications = currentNotifications.map(notification => ({
      ...notification,
      read: true
    }));
    this.notifications.next(updatedNotifications);
    this.updateUnreadCount(updatedNotifications);
  }

  private updateNotificationStatus(id: number, read: boolean): void {
    const currentNotifications = this.notifications.value;
    const updatedNotifications = currentNotifications.map(notification => 
      notification.id === id ? { ...notification, read } : notification
    );
    this.notifications.next(updatedNotifications);
    this.updateUnreadCount(updatedNotifications);
  }

  private updateUnreadCount(notifications: Notification[]): void {
    const count = notifications.filter(notification => !notification.read).length;
    this.unreadCount.next(count);
  }

  deleteNotification(id: number): void {
    this.http.delete(`${GlobalComponent.API_URL}notifications/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error deleting notification:', error);
        return EMPTY;
      })
    ).subscribe(() => {
      const currentNotifications = this.notifications.value;
      const updatedNotifications = currentNotifications.filter(n => n.id !== id);
      this.notifications.next(updatedNotifications);
      this.updateUnreadCount(updatedNotifications);
    });
  }

  getNotificationsByType(type: string): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${GlobalComponent.API_URL}notifications/type/${type}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error loading notifications by type:', error);
        return EMPTY;
      })
    );
  }

  private loadMockNotifications(): void {
    const mockNotifications: Notification[] = [
      {
        id: 1,
        type: 'ARTICLE_CREATED',
        message: 'New article "Summer Collection" has been added',
        timestamp: new Date(Date.now() - 1000 * 60 * 5),
        read: false
      },
      {
        id: 2,
        type: 'CATEGORY_CREATED',
        message: 'Category "Electronics" has been updated',
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        read: false
      }
    ];
    
    this.notifications.next(mockNotifications);
    this.updateUnreadCount(mockNotifications);
  }

  // Check connection status
  isWebSocketConnected(): boolean {
    return this.isConnected;
  }

  // Force reconnect WebSocket
  reconnectWebSocket(): void {
    this.reconnectAttempts = 0;
    this.connectWebSocket();
  }

  ngOnDestroy(): void {
    if (this.stompClient) {
      this.stompClient.deactivate();
    }
  }
}