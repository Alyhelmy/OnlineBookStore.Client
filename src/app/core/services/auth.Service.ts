import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiResponse } from "../../shared/models/api-response";
import { AuthResponse, LoginRequest, RegisterRequest } from "../../shared/models/auth";

@Injectable({
    providedIn: 'root'  
})

export class AuthService {
    private apiUrl = "https://api.onlinebookstore.app/api/auth";
    private tokenKey = 'token';
    private roleKey = 'role';

    constructor(private http: HttpClient) {}

  register(request: RegisterRequest): Observable<ApiResponse<AuthResponse>> {
    return this.http.post<ApiResponse<AuthResponse>>(`${this.apiUrl}/register`, request);
    }

  login(request: LoginRequest): Observable<ApiResponse<AuthResponse>> {
    return this.http.post<ApiResponse<AuthResponse>>(`${this.apiUrl}/login`, request);
  }

  saveAuth(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  //getRole(): string | null {
  //  return localStorage.getItem(this.roleKey);
 // }

  isLoggedIn(): boolean {
  const token = this.getToken();

  if (!token) {
    return false;
  }

  if (this.isTokenExpired(token)) {
    this.logout();
    return false;
  }

  return true;
  }

  getUserRole(): string | null {
    const token = this.getToken();

    if (!token || this.isTokenExpired(token)) {
      this.logout();
      return null;
    }
    
    const payload = this.decodeTokenPayload(token);
    return payload?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || null;
  }

  private isTokenExpired(token: string): boolean {
    const payload = this.decodeTokenPayload(token);
    
    if(!payload || !payload.exp){
      return true;
    }

    const expiryTimeInMilliseconds  = payload.exp * 1000; // time in milliseconds
    return Date.now() > expiryTimeInMilliseconds ; 
  }

  private decodeTokenPayload(token: string): any | null {
  try {
    const parts = token.split('.');

    if (parts.length !== 3) {
      return null;
    }

    let payload = parts[1];

    payload = payload.replace(/-/g, '+').replace(/_/g, '/');

    while (payload.length % 4) {
      payload += '=';
    }

    const decodedPayload = atob(payload);

    return JSON.parse(decodedPayload);
  } catch {
    return null;
  }
}



  isAdmin(): boolean {
    return this.getUserRole() === 'Admin';
  }



  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.roleKey);
  }
}
