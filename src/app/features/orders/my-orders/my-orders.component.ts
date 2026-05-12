import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { OrderService } from '../../../core/services/order.Service';
import { OrderResponse } from '../../../shared/models/order';

@Component({
  selector: 'app-my-orders',
  imports: [DatePipe, RouterLink],
  templateUrl: './my-orders.html',
  styleUrl: './my-orders.css',
})
export class MyOrdersComponent implements OnInit {
  orders: OrderResponse[] = [];
  isLoading = true;
  errorMessage = '';

  constructor( private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getMyOrders().subscribe({
      next: (response) => {
        this.isLoading = false;

        if (response.isSuccess){
          this.orders = response.data;
        }else{
          this.errorMessage = response.message;
        }
      },
      error: () => {
        this.isLoading = false;
        this.errorMessage = 'Error loading orders';
      }
    });
  }
}
