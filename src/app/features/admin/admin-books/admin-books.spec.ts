import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBooksComponent } from './admin-books.component';

describe('AdminBooks', () => {
  let component: AdminBooksComponent;
  let fixture: ComponentFixture<AdminBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminBooksComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminBooksComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
