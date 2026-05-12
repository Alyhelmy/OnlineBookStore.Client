import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BookService } from '../../../core/services/book.Service';
import { CartService } from '../../../core/services/cart.Service';
import { NotificationService } from '../../../core/services/notification.Service';
import { Book } from '../../../shared/models/book';

@Component({
  selector: 'app-book-details',
  imports: [RouterLink],
  templateUrl: './book-details.html',
  styleUrl: './book-details.css',
})
export class BookDetailsComponent implements OnInit {
  book?: Book;
  isLoading = true;
  errorMessage = '';
  successMessage = '';

  constructor(
    private route: ActivatedRoute, // to get the id from the url
    private bookService: BookService, 
    private cartService: CartService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')); // get the id from the url

    if(!id){
      this.errorMessage = "Invalid book id.";
      this.isLoading = false;
      return;
    }

    this.loadBook(id);

  }

  loadBook(id: number): void{
    this.bookService.getBookById(id).subscribe({
      next: (book) => {
        this.book = book;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Book not found.';
        this.isLoading = false;
      }
    });

  }

  addToCart(): void{
    if (!this.book){
      return;
    }

    this.errorMessage = '';
    this.successMessage = '';

    this.cartService.addToCart({
      bookId: this.book.id,
      quantity: 1
    }).subscribe({
      next: (response) => {
        if (response.isSuccess){
          //this.successMessage = "Book added to cart";
          this.notificationService.showSuccess(`${this.book?.title} added to cart`);
        }else{
          //this.errorMessage = response.message;
          this.notificationService.showError(response.message);
        }
      },
      error: (error) => {
        if (error.status === 401){
         // this.errorMessage = "Please login first";
          this.notificationService.showError('Please login first'); 
          return;
        }
        //this.errorMessage = "failed to add to cart";
        this.notificationService.showError('Failed to add to cart');
      }
    });
    }
    
}