import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BookService } from '../../../core/services/book.Service';
import { Book } from '../../../shared/models/book';

@Component({
  selector: 'app-admin-books',
  imports: [FormsModule], 
  templateUrl: './admin-books.html',
  styleUrl: './admin-books.css',
})
export class AdminBooksComponent {

books: Book[] = [];

  bookForm: Book = this.getEmptyBook();

  editingBookId: number | null = null;

  isLoading = true;
  isSaving = false;
  errorMessage = '';
  successMessage = '';

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.bookService.getBooks().subscribe({
      next: (books) => {
        this.books = books;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load books.';
        this.isLoading = false;
      }
    });
  }

  saveBook(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.bookForm.title || this.bookForm.price <= 0 || this.bookForm.stockQuantity < 0) {
      this.errorMessage = 'Please enter valid book data.';
      return;
    }

    this.isSaving = true;

    if (this.editingBookId) {
      this.bookService.updateBook(this.editingBookId, this.bookForm).subscribe({
        next: (response) => {
          this.isSaving = false;

          if (response.isSuccess) {
            this.successMessage = response.message;
            this.resetForm();
            this.loadBooks();
          } else {
            this.errorMessage = response.message;
          }
        },
        error: (error) => {
          this.isSaving = false;
          this.errorMessage = error.error?.message || 'Failed to update book.';
        }
      });

      return;
    }

    this.bookService.createBook(this.bookForm).subscribe({
      next: (response) => {
        this.isSaving = false;

        if (response.isSuccess) {
          this.successMessage = response.message;
          this.resetForm();
          this.loadBooks();
        } else {
          this.errorMessage = response.message;
        }
      },
      error: (error) => {
        this.isSaving = false;
        this.errorMessage = error.error?.message || 'Failed to create book.';
      }
    });
  }

  editBook(book: Book): void {
    this.editingBookId = book.id;

    this.bookForm = {
      id: book.id,
      title: book.title,
      author: book.author,
      description: book.description,
      category: book.category,
      price: book.price,
      stockQuantity: book.stockQuantity,
      imageUrl: book.imageUrl
    };

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  deleteBook(book: Book): void {
    const confirmed = confirm(`Are you sure you want to delete "${book.title}"?`);

    if (!confirmed) {
      return;
    }

    this.bookService.deleteBook(book.id).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.successMessage = response.message;
          this.loadBooks();
        } else {
          this.errorMessage = response.message;
        }
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Failed to delete book.';
      }
    });
  }

  cancelEdit(): void {
    this.resetForm();
  }

  private resetForm(): void {
    this.bookForm = this.getEmptyBook();
    this.editingBookId = null;
  }

  private getEmptyBook(): Book {
    return {
      id: 0,
      title: '',
      author: '',
      description: '',
      category: '',
      price: 0,
      stockQuantity: 0,
      imageUrl: ''
    };
  }
}