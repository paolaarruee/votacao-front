import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { environment } from 'src/app/environments/environment';
import * as jwt_decode from 'jwt-decode';
import { AccessToken } from 'src/app/shared/interfaces/auth';
import { Users } from 'src/app/shared/interfaces/users';

class MockRouter {
  navigateByUrl = jasmine.createSpy('navigateByUrl');
}

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let httpMock: HttpTestingController;
  let router: MockRouter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthenticationService,
        { provide: Router, useClass: MockRouter },
      ],
    });

    service = TestBed.inject(AuthenticationService);
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router) as unknown as MockRouter;
  });

  afterEach(() => {
    localStorage.clear();
    httpMock.verify();
  });

  it('deve fazer login e armazenar o token', () => {
    const mockUser: Users = { cpf: '12345678901', senha: 'password' };
    const mockToken: AccessToken = { accessToken: 'mockAccessToken' };

    service.login(mockUser).subscribe((response) => {
      expect(response).toEqual(mockToken);
      expect(service.token).toBe('mockAccessToken');
    });

    const req = httpMock.expectOne(`${environment.API_URL}entrar`);
    expect(req.request.method).toBe('POST');
    req.flush(mockToken);
  });

  it('deve remover o token e navegar para /entrar ao deslogar', () => {
    localStorage.setItem('token', 'mockAccessToken');
    service.logout();
    expect(service.token).toBeNull();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/entrar');
  });

  it('deve retornar true se o usuário for admin', () => {
    const mockToken = jwt_encode({ admin: 1 });
    service.token = mockToken;

    expect(service.isAdmin()).toBe(true);
  });

  it('deve retornar false se o usuário não for admin', () => {
    const mockToken = jwt_encode({ admin: 0 });
    service.token = mockToken;

    expect(service.isAdmin()).toBe(false);
  });

  it('deve retornar true se o usuário estiver autenticado', () => {
    service.token = 'mockAccessToken';
    expect(service.isAuthenticated).toBe(true);
  });

  it('deve retornar false se o usuário não estiver autenticado', () => {
    service.token = null;
    expect(service.isAuthenticated).toBe(false);
  });

  it('deve armazenar o token no localStorage', () => {
    service.token = 'mockAccessToken';
    expect(localStorage.getItem('token')).toBe('mockAccessToken');
  });

  it('deve remover o token do localStorage', () => {
    service.token = 'mockAccessToken';
    service.token = null;
    expect(localStorage.getItem('token')).toBeNull();
  });
});

function jwt_encode(payload: object): string {
  return `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(
    JSON.stringify(payload)
  )}.signature`;
}
