import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { ErrorService } from '../../../core/services/error.Service';

@Component({
  selector: 'app-error-banner',
  imports: [AsyncPipe],
  templateUrl: './error-banner.html',
  styleUrl: './error-banner.css',
})
export class ErrorBannerComponent {
  error$;

  constructor(private errorService: ErrorService) {
    this.error$ = errorService.error$;
  }

  clear(): void {
    this.errorService.clearError();
  }
}
