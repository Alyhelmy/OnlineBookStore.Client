import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../shared/models/api-response';
import { UserResponse } from '../../shared/models/user';

@Injectable({
  providedIn: 'root',
})
export class AdminUserService {
  private apiUrl = 'https://api.onlinebookstore.app/api/admin/users';

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<ApiResponse<UserResponse[]>> {
    return this.http.get<ApiResponse<UserResponse[]>>(this.apiUrl);
  }

  updateUserRole(userId: number, role: string): Observable<ApiResponse<UserResponse>> {
    return this.http.put<ApiResponse<UserResponse>>(
      `${this.apiUrl}/${userId}/role`,
      {role}
    );
  }
  }
