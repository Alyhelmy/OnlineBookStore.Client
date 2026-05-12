import { Component, inject } from '@angular/core';
import { NotificationService } from '../../../core/services/notification.Service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.html',
  styleUrl: './notifications.css'
})
export class NotificationsComponent {
  readonly notificationService = inject(NotificationService);
}
