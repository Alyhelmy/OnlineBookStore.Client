import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.Service';
import { CartService } from '../../../core/services/cart.Service';


@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class NavbarComponent {
  //cartCount$;

  constructor(
    public authService: AuthService,
    private cartService: CartService,
    private router: Router,
    
  ) {
   // this.cartCount$ = this.cartService.cartCount$;
  }

  
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}