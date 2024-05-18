import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../services/authentication/authentication.service';

import { AuthGuard } from './auth.guard';

class MockAuthenticationService {
  isAuthenticated = true;
}

class MockRouter {
  navigateByUrl = jasmine.createSpy('navigateByUrl');
}

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let authService: MockAuthenticationService;
  let router: MockRouter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthenticationService, useClass: MockAuthenticationService },
        { provide: Router, useClass: MockRouter },
      ],
    });

    authGuard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(
      AuthenticationService
    ) as unknown as MockAuthenticationService;
    router = TestBed.inject(Router) as unknown as MockRouter;
  });

  it('deve permitir a navegação se o usuário estiver autenticado', () => {
    authService.isAuthenticated = true;
    expect(authGuard.canActivate()).toBe(true);
  });

  it('deve bloquear a navegação e redirecionar para /entrar se o usuário não estiver autenticado', () => {
    authService.isAuthenticated = false;
    expect(authGuard.canActivate()).toBe(false);
    expect(router.navigateByUrl).toHaveBeenCalledWith('/entrar');
  });
});
