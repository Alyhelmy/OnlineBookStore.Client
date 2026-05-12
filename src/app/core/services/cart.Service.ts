import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiResponse } from "../../shared/models/api-response";
import { AddToCartRequest, CartResponse, UpdateCartRequest } from "../../shared/models/cart";

@Injectable({
    providedIn: "root",
})

export class CartService {
    private apiUrl = "https://api.onlinebookstore.app/api/cart";

    constructor(private http: HttpClient) {}

    getCart(): Observable<ApiResponse<CartResponse>>{
        return this.http.get<ApiResponse<CartResponse>>(this.apiUrl);
    }

    addToCart(request: AddToCartRequest): Observable<ApiResponse<CartResponse>>{
        return this.http.post<ApiResponse<CartResponse>>(`${this.apiUrl}/items`, request);
    }

    updateCartItem( cartItemId: number, request: UpdateCartRequest): Observable<ApiResponse<CartResponse>>{
        return this.http.put<ApiResponse<CartResponse>>(`${this.apiUrl}/items/${cartItemId}`, request);
        
    }

    removeCartItem(cartItemId: number): Observable<ApiResponse<boolean>>{
        return this.http.delete<ApiResponse<boolean>>(`${this.apiUrl}/items/${cartItemId}`);
    }

    clearCart(): Observable<ApiResponse<boolean>> {
    return this.http.delete<ApiResponse<boolean>>(this.apiUrl);
  }
}
    