import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../../core/services/order.Service';
import { OrderResponse } from '../../../shared/models/order';

@Component({
  selector: 'app-admin-orders',
  imports: [DatePipe, FormsModule],
  templateUrl: './admin-orders.html',
  styleUrl: './admin-orders.css',
})
export class AdminOrdersComponent implements OnInit{

  orders: OrderResponse[] = []; //here we will store the orders from the API response to display them
  statuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
  searchTerm = '';
  selectedStatus = '';
  showAllOrders = false;

  isLoading = true;
  errorMessage = '';
  successMessage = '';

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  get hasFilters(): boolean {
    return this.searchTerm.trim().length > 0 || this.selectedStatus.length > 0;
  }

  get filteredOrders(): OrderResponse[] {
    const term = this.searchTerm.trim().toLowerCase();

    return this.orders.filter((order) => {
      const matchesSearch =
        !term ||
        order.id.toString().includes(term) ||
        order.userFullName.toLowerCase().includes(term) ||
        order.userEmail.toLowerCase().includes(term);

      const matchesStatus =
        !this.selectedStatus || order.status === this.selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }

  get visibleOrders(): OrderResponse[] {
    if (this.showAllOrders || this.hasFilters) {
      return this.filteredOrders;
    }

    return [];
  }

  loadOrders(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.orderService.getAllOrders().subscribe({
      next: (response) => {  
        this.isLoading = false;

        if(response.isSuccess){
          this.orders = response.data;
        }else{
          this.errorMessage = response.message;
        }
      },
      error: (error) => {
        this.isLoading = false;

        if (error.status === 403){
          this.errorMessage = 'You are not authorized to view this page.';
          return;
        }
        if (error.status === 401){
          this.errorMessage = 'You are not logged in. Please log in to view this page.';
          return;
        }
        this.errorMessage = "Error loading orders";
      }
    });
  }

  applySearch(): void {
    this.showAllOrders = false;
    this.successMessage = '';
  }

  showAll(): void {
    this.showAllOrders = true;
    this.successMessage = '';
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.selectedStatus = '';
    this.showAllOrders = false;
    this.successMessage = '';
  }

  updateStatus(order: OrderResponse, newStatus: string): void {
    this.errorMessage = '';
    this.successMessage = '';
    
    this.orderService.updateOrderStatus(order.id,newStatus).subscribe({
      next: (response) => {
        if(response.isSuccess){
          order.status = response.data.status;
          this.successMessage = `Order #${order.id} status updated to ${response.data.status}.`;
        }else{
          this.errorMessage = response.message;
        }
      },
      error: (error) => {
        if (error.status === 403) {
          this.errorMessage = 'Only admins can update order status.';
          return;
        }

        this.errorMessage = error.error?.message || 'Failed to update order status.';
      }
    });
  }
}
