import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.Service';

import { authGuard } from './auth.guard';

describe('authGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  let navigateSpy: ReturnType<typeof jasmine.createSpy>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    navigateSpy = jasmine.createSpy('navigate');
    authServiceSpy = jasmine.createSpyObj<AuthService>('AuthService', ['isLoggedIn']);

    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: { navigate: navigateSpy } },
        { provide: AuthService, useValue: authServiceSpy }
      ]
    });
  });

  it('allows logged-in users', () => {
    authServiceSpy.isLoggedIn.and.returnValue(true);

    expect(executeGuard({} as never, {} as never)).toBeTrue();
    expect(navigateSpy).not.toHaveBeenCalled();
  });

  it('redirects guests to login', () => {
    authServiceSpy.isLoggedIn.and.returnValue(false);

    expect(executeGuard({} as never, {} as never)).toBeFalse();
    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
  });
});
