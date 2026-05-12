import { inject } from '@angular/core';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { ErrorService } from '../services/error.Service';
import { ErrorResponse } from '../../shared/models/error-response';
import { AuthService } from '../services/auth.Service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  const errorService = inject(ErrorService);
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const backendError = error.error as ErrorResponse;

      let message = 'Something went wrong.';

      if (backendError?.message) {
        message = backendError.message;
      }
      
      if (error.status === 0) {
        message = "Cannot connect to server.";
      }

       if (error.status === 401) {
        authService.logout();
        message = 'Your session expired. Please login again';
      }

      if (error.status === 403) {
        message = 'You are not allowed to perform this action.';
      }

      errorService.showError({
        message,
      
      });

      return throwError(() => error);

    })
  )
};
