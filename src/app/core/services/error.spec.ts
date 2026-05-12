import { TestBed } from '@angular/core/testing';

import { ErrorService } from './error.Service';

describe('Error', () => {
  let service: Error;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Error);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
