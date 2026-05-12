import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BookService } from '../../../core/services/book.Service';
import { CartService } from '../../../core/services/cart.Service';
import { NotificationService } from '../../../core/services/notification.Service';
import { Book } from '../../../shared/models/book';

@Component({
  selector: 'app-book-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './book-list.html',
  styleUrl: './book-list.css',
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(
    private bookService: BookService,
    private cartService: CartService,
    private notificationService: NotificationService
  ){}


  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void{
    this.bookService.getBooks().subscribe({
      next: (books) => {
        this.books = books;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Error loading books';
        this.isLoading = false;
      }

    });
  }

  addToCart(bookId: number): void{
    this.cartService.addToCart({
      bookId,
      quantity: 1
    }).subscribe({
      next: () => {
        //alert('Book added to cart');
        this.notificationService.showSuccess('Book added to cart');
      },
      error: (error) => {
        if (error.status === 401){
          //alert('Please login first');
          this.notificationService.showError('Please login first');
          return;
        }
        //alert('Failed to add to cart');
        this.notificationService.showError('Failed to add to cart');
      }
    });
    
  }
}
