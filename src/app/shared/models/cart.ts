export interface CartItemResponse { 
    id: number;
    bookId: number;
    title: string;
    price: number;
    quantity: number;
    stockQuantity: number;
    imageUrl: string;
    subtotal: number;
}

export interface CartResponse {
    items: CartItemResponse[];
    totalPrice: number;
}

export interface AddToCartRequest {
    bookId: number;
    quantity: number;
}

export interface UpdateCartRequest {
    quantity: number;
}