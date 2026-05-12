import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.Service';
import { RegisterRequest } from '../../../shared/models/auth';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class RegisterComponent {registerRequest: RegisterRequest = {
    fullName: '',
    email: '',
    password: ''
  };

  errorMessage = '';
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  register(): void {
    this.errorMessage = '';

    if (
      !this.registerRequest.fullName ||
      !this.registerRequest.email ||
      !this.registerRequest.password
    ) {
      this.errorMessage = 'All fields are required.';
      return;
    }

    this.isLoading = true;

    this.authService.register(this.registerRequest).subscribe({
      next: (response) => {
        this.isLoading = false;

        if (response.isSuccess) {
          this.authService.saveAuth(response.data.token);
          this.router.navigate(['/books']);
        } else {
          this.errorMessage = response.message;
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.error?.message || 'Registration failed.';
      }
    });
  }
}
