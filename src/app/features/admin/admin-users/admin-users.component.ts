import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminUserService } from '../../../core/services/admin-user.Service';
import { UserResponse } from '../../../shared/models/user';

@Component({
  selector: 'app-admin-users',
  imports: [DatePipe, FormsModule],
  templateUrl: './admin-users.html',
  styleUrl: './admin-users.css',
})
export class AdminUsersComponent implements OnInit{
  users: UserResponse[] = [];
  roles = ['Customer', 'Admin'];

  isLoading = true;
  errorMessage = '';
  successMessage = '';

  constructor(private adminUserService: AdminUserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }
  loadUsers(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.adminUserService.getAllUsers().subscribe({
      next: (response) => {
        this.isLoading = false;

        if(response.isSuccess){
          this.users = response.data;
        }else{
          this.errorMessage = response.message;
        }
        },
        error: (error) =>{
          this.isLoading = false;

          if (error.status === 403) {
          this.errorMessage = 'You are not allowed to view users.';
          return;
        }

        this.errorMessage = 'Failed to load users.';
      }
    });
  }

  updateRole(user: UserResponse, newRole: string): void {
    this.errorMessage = '';
    this.successMessage = '';

    this.adminUserService.updateUserRole(user.id, newRole).subscribe({
      next: (response) => {
        if (response.isSuccess){
          user.role = response.data.role;
          this.successMessage = `${user.email} role is updated to ${user.role}.`;
        }else{
          this.errorMessage = response.message;
        }
      },
      error: (error) => {
        if(error.status === 403){
        this.errorMessage = 'Only admins can update user roles.';
        return;
      }
      this.errorMessage = error.error?.message || 'Failed to update user role.';
    }
    });
  }
 }
