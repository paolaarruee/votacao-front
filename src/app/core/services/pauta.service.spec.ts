import { TestBed } from '@angular/core/testing';

import { PautaService } from './pauta.service';

describe('PautaService', () => {
  let service: PautaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PautaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
