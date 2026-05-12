import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { BookListComponent } from './features/books/book-list/book-list.component';
import { BookDetailsComponent } from './features/books/book-details/book-details.component';
import { CartPageComponent } from './features/cart/cart-page/cart-page.component';
import { MyOrdersComponent } from './features/orders/my-orders/my-orders.component';
import { AdminOrdersComponent } from './features/admin/admin-orders/admin-orders.component';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';
import { AdminBooksComponent } from './features/admin/admin-books/admin-books.component';
import { AdminUsersComponent } from './features/admin/admin-users/admin-users.component';


export const routes: Routes = [
  { path: '', redirectTo: 'books', pathMatch: 'full' },

  { path: 'books', component: BookListComponent },
  { path: 'books/:id', component: BookDetailsComponent },
  

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'cart', component: CartPageComponent },
  { path: 'orders', component: MyOrdersComponent, canActivate: [authGuard] },

  { path: 'admin/orders', component: AdminOrdersComponent, canActivate: [adminGuard] },
  { path: 'admin/books', component: AdminBooksComponent, canActivate: [adminGuard] },
  { path: 'admin/users', component: AdminUsersComponent, canActivate: [adminGuard] },
  
  { path: '**', redirectTo: 'books' }
];
