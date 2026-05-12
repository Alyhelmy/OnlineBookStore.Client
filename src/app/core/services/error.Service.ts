import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface AppError {
  message: string;
  requestId?: string;
}
@Injectable({
  providedIn: 'root',
})

export class ErrorService { // used to show errors in the UI
  private errorSubject = new BehaviorSubject<AppError | null>(null);  

  error$ = this.errorSubject.asObservable();

  showError(error: AppError) {
    this.errorSubject.next(error);
  }

  clearError(): void {
    this.errorSubject.next(null);
  }
}
