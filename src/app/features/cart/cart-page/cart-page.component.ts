import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../../core/services/cart.Service';
import { CartItemResponse } from '../../../shared/models/cart';
import { OrderService } from '../../../core/services/order.Service';
import { CartItem } from '../../../shared/models/cart-item';
import { OrderResponse } from '../../../shared/models/order';

@Component({
  selector: 'app-cart-page',
  imports: [RouterLink],
  templateUrl: './cart-page.html',
  styleUrl: './cart-page.css',
})

export class CartPageComponent implements OnInit { 
  cartItems: CartItemResponse[] = [];
  totalPrice = 0;

  isLoading = true;
  errorMessage = '';
  successMessage = '';
  isCheckingOut = false; // Add a flag to indicate if the user is checking out


  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void{
    this.isLoading = true;
    this.errorMessage = '';

    this.cartService.getCart().subscribe({
      next: (response) =>{
        this.isLoading = false;

        if(response.isSuccess){
          this.cartItems = response.data.items;
          this.totalPrice = response.data.totalPrice;
        }else{
          this.errorMessage = response.message;
        }
      },
      error: () => {
        this.isLoading = false;
        this.errorMessage = 'Failed to load cart.';
      }
    });
  }

  updateQuantity(item: CartItemResponse, quantity:number): void{
    this.cartService.updateCartItem(item.id, {quantity
    }).subscribe({
      next: (response) => {
        if (response.isSuccess){
          this.cartItems = response.data.items;
          this.totalPrice = response.data.totalPrice;
        }
      }
    });
  }


  increaseQuantity(item: CartItemResponse): void{
    this.updateQuantity(item, item.quantity + 1);
  }

  decreaseQuantity(item: CartItemResponse): void{
    if (item.quantity <= 1) {
      return;
    }
    this.updateQuantity(item, item.quantity - 1);
  }
  removeItem(item: CartItemResponse): void {
    this.cartService.removeCartItem(item.id).subscribe({
      next: () => {
        this.loadCart();
      }
    });
  }

  clearCart(): void {
    this.cartService.clearCart().subscribe({
        next: () => this.loadCart()
    });
}

  checkout(): void{
    this.errorMessage = '';
    this.successMessage = '';

    if(this.cartItems.length === 0){
      this.errorMessage = 'Your cart is empty. Please add items to your cart before checking out.';
      return;
    }

    this.isCheckingOut = true; // Set the flag to true when the user starts checking out

    this.orderService.createOrder().subscribe({
      next: (response) => { 
        this.isCheckingOut = false; 

        if (response.isSuccess){
          this.loadCart();
          this.successMessage = response.message;

          setTimeout(() => {
            this.router.navigate(['/orders']);
          }, 2000);
        }else {
          this.errorMessage = response.message;
        }
      },
      error: (error) => {
        this.isCheckingOut = false;

        if (error.status === 401){
          this.errorMessage = 'You are not logged in. Please log in to checkout.';
          this.router.navigate(['/login']);
          return;
        }
        if(error.status === 422){
          this.errorMessage = error.error?.message || 'Could not complete your order.';
          return;
        }

        this.errorMessage = error.error?.message || 'Checkout Failed'; //this means if there is an error message in the response, use it, otherwise use the default error message
      }
    })

  }

}
