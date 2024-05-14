import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { PautaService } from './pauta.service';
import { environment } from 'src/app/environments/environment';
import { Pauta } from 'src/app/shared/interfaces/pauta';

describe('PautaService', () => {
  let service: PautaService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PautaService]
    });
    service = TestBed.inject(PautaService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica se não há solicitações pendentes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch pautas', () => {
    const mockPautas: Pauta[] = [{
      id: 1, descricao: 'Pauta 1',
      titulo: ''
    }, {
      id: 2, descricao: 'Pauta 2',
      titulo: ''
    }];

    service.getPautas().subscribe(pautas => {
      expect(pautas.length).toBe(2);
      expect(pautas).toEqual(mockPautas);
    });

    const req = httpMock.expectOne(`${environment.API_URL}pautas`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPautas);
  });

  it('should create pauta', () => {
    const newPauta: Pauta = {
      id: 1, descricao: 'Nova Pauta',
      titulo: ''
    };

    service.createPauta(newPauta).subscribe(pauta => {
      expect(pauta).toEqual(newPauta);
    });

    const req = httpMock.expectOne(`${environment.API_URL}pauta`);
    expect(req.request.method).toBe('POST');
    req.flush(newPauta);
  });


});
