import { TestBed } from '@angular/core/testing';

import { UsersService } from './users.service';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { environment } from 'src/app/environments/environment';
import { Users } from 'src/app/shared/interfaces/users';

describe('UsersService', () => {
  let service: UsersService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsersService],
    });
    service = TestBed.inject(UsersService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a POST request to create a new pauta', () => {
    const admUser: Users = {
      nome: 'usuarioadm',
      cpf: '11111111111',
      email: 'usuarioadm@gmail.com',
      senha: '12345678',
      admin: true,
    };

    service.createPauta(admUser).subscribe((response) => {
      expect(response).toEqual(admUser);
    });

    const req = httpMock.expectOne(`${environment.API_URL}cadastrar`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(admUser);
    req.flush(admUser);
  });
});
