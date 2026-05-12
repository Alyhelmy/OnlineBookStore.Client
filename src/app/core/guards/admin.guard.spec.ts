import { TestBed } from '@angular/core/testing';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.Service';
import { adminGuard } from './admin.guard';

describe('adminGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => adminGuard(...guardParameters));

  let navigateSpy: ReturnType<typeof jasmine.createSpy>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    navigateSpy = jasmine.createSpy('navigate');
    authServiceSpy = jasmine.createSpyObj<AuthService>('AuthService', ['isLoggedIn', 'isAdmin']);

    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: { navigate: navigateSpy } },
        { provide: AuthService, useValue: authServiceSpy }
      ]
    });
  });

  it('redirects guests to login', () => {
    authServiceSpy.isLoggedIn.and.returnValue(false);

    expect(executeGuard({} as never, {} as never)).toBeFalse();
    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
  });

  it('redirects logged-in non-admin users to books', () => {
    authServiceSpy.isLoggedIn.and.returnValue(true);
    authServiceSpy.isAdmin.and.returnValue(false);

    expect(executeGuard({} as never, {} as never)).toBeFalse();
    expect(navigateSpy).toHaveBeenCalledWith(['/books']);
  });

  it('allows admin users', () => {
    authServiceSpy.isLoggedIn.and.returnValue(true);
    authServiceSpy.isAdmin.and.returnValue(true);

    expect(executeGuard({} as never, {} as never)).toBeTrue();
    expect(navigateSpy).not.toHaveBeenCalled();
  });
});
