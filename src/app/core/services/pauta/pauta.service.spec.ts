import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { PautaService } from './pauta.service';
import { Pauta } from 'src/app/shared/interfaces/pauta';
import { environment } from 'src/app/environments/environment';

describe('PautaService', () => {
  let service: PautaService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PautaService],
    });
    service = TestBed.inject(PautaService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('deve retornar pautas e totalCount corretos', () => {
    const page = 1;
    const limit = 10;
    const mockPautas: Pauta[] = [
      { id: 1, titulo: 'Pauta 1', descricao: 'Descricao Pauta 1' },
      { id: 2, titulo: 'Pauta 2', descricao: 'Descricao Pauta 2' },
    ];
    const mockTotalCount = 20;

    service.getPautas(page, limit).subscribe((result) => {
      expect(result.pautas).toEqual(mockPautas);
      expect(result.totalCount).toBe(mockTotalCount);
    });

    const req = httpTestingController.expectOne(
      `${environment.API_URL}pautas?page=${page}&limit=${limit}`
    );
    expect(req.request.method).toEqual('GET');

    req.flush(mockPautas, {
      headers: { 'x-total-count': mockTotalCount.toString() },
    });
  });

  it('should create pauta', () => {
    const newPauta: Pauta = {
      id: 1,
      descricao: 'Nova Pauta',
      titulo: '',
    };

    service.createPauta(newPauta).subscribe((pauta) => {
      expect(pauta).toEqual(newPauta);
    });

    const req = httpTestingController.expectOne(`${environment.API_URL}pauta`);
    expect(req.request.method).toBe('POST');
    req.flush(newPauta);
  });
});
