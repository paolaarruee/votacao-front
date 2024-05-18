import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { AuthenticationInterceptor } from './authentication.interceptor';

// Serviço Mock
class MockAuthenticationService {
  token: string | null = 'mockToken';
}

describe('AuthenticationInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let authService: MockAuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthenticationInterceptor,
          multi: true,
        },
        { provide: AuthenticationService, useClass: MockAuthenticationService },
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    authService = TestBed.inject(
      AuthenticationService
    ) as unknown as MockAuthenticationService;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('deve adicionar o token ao cabeçalho da requisição', () => {
    httpClient.get('/test').subscribe();

    const httpRequest = httpMock.expectOne('/test');

    expect(httpRequest.request.headers.has('Authorization')).toBeTruthy();
    expect(httpRequest.request.headers.get('Authorization')).toBe(
      'Bearer mockToken'
    );
  });

  it('não deve adicionar o token ao cabeçalho da requisição se o token for null', () => {
    authService.token = null;

    httpClient.get('/test').subscribe();

    const httpRequest = httpMock.expectOne('/test');

    expect(httpRequest.request.headers.has('Authorization')).toBeFalsy();
  });
});
