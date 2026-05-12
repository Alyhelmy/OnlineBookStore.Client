import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar';
import { NotificationsComponent } from './shared/components/notifications/notifications';
import { ErrorBannerComponent } from './shared/components/error-banner/error-banner.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, NotificationsComponent , ErrorBannerComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
