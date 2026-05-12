import { Injectable, signal } from '@angular/core';

export type NotificationType = 'success' | 'error' | 'info';

export interface AppNotification {
  id: number;
  message: string;
  type: NotificationType;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  readonly notifications = signal<AppNotification[]>([]);

  show(message: string, type: NotificationType = 'info', duration = 3200): void {
    const notification: AppNotification = {
      id: Date.now() + Math.floor(Math.random() * 1000),
      message,
      type
    };

    this.notifications.update((items) => [...items, notification]);

    window.setTimeout(() => {
      this.dismiss(notification.id);
    }, duration);
  }

  showSuccess(message: string): void {
    this.show(message, 'success');
  }

  showError(message: string): void {
    this.show(message, 'error');
  }

  dismiss(id: number): void {
    this.notifications.update((items) => items.filter((item) => item.id !== id));
  }
}
