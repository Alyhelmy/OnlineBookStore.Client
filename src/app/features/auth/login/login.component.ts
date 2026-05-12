import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.Service';
import { LoginRequest } from '../../../shared/models/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule,RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  loginRequest: LoginRequest = {
    email: '',
    password: ''
  };

  errorMessage = '';
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login(): void{
    this.errorMessage = '';
    
    if (!this.loginRequest.email || !this.loginRequest.password){
      this.errorMessage = 'Email and password are required';
      return;
    }

    this.isLoading = true;

    this.authService.login(this.loginRequest).subscribe({

      next: (response) => {
        this.isLoading = false;

        if(response.isSuccess){
          this.authService.saveAuth(response.data.token);
          this.router.navigate(['/books']);
        }else{
          this.errorMessage = response.message;
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.error?.message || 'Login Failed.';
      }
    })


  }

}
