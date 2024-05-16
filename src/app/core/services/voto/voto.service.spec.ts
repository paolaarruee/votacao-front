import { TestBed } from '@angular/core/testing';

import { VotoService } from './voto.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from 'src/app/environments/environment';
import { Votos } from 'src/app/shared/interfaces/votos';

describe('VotoService', () => {
  let service: VotoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [VotoService],
    });
    service = TestBed.inject(VotoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('deve enviar o voto com sucesso', () => {
    const mockIdSessao = 1;
    const mockOpcao = 'A';

    const mockResponse: Votos = {
      id: 1,
      sessaoId: 100,
      userCpf: '1111111111',
      opcao: 'sim',
    };

    service.enviarVoto(mockIdSessao, mockOpcao).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      `${environment.API_URL}voto/${mockIdSessao}`
    );
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });
});
