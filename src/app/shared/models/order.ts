export interface OrderItemResponse{
    bookId: number;
    bookTitle: string;
    author: string;
    unitPrice: number;
    quantity: number;
    totalPrice: number;
}

export interface OrderResponse{
    id: number;
    totalAmount: number;
    status: string;
    createdAt: string;
    userFullName: string;
    userEmail: string;
    items: OrderItemResponse[];
}