import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../shared/models/api-response';
import { OrderResponse } from '../../shared/models/order';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    private apiUrl = 'https://api.onlinebookstore.app/api/orders';

    constructor(private http: HttpClient) { }

    createOrder(): Observable<ApiResponse<OrderResponse>> {
        return this.http.post<ApiResponse<OrderResponse>>(this.apiUrl,{});
    }

    getMyOrders(): Observable<ApiResponse<OrderResponse[]>> {
        return this.http.get<ApiResponse<OrderResponse[]>>(`${this.apiUrl}/my-orders`);
    }

    getAllOrders(): Observable<ApiResponse<OrderResponse[]>> {
        return this.http.get<ApiResponse<OrderResponse[]>>(`${this.apiUrl}/all`);
    }

    updateOrderStatus(orderId: number, status: string): Observable<ApiResponse<OrderResponse>>{
        return this.http.put<ApiResponse<OrderResponse>>(
            `${this.apiUrl}/${orderId}/status`,{status} //the difference between orderId and status is that status is a string so we need to pass it as an object
        );
    }
}