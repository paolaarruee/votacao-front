import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListaPautasComponent } from './lista-pautas.component';
import { of } from 'rxjs';
import { PautaService } from 'src/app/core/services/pauta/pauta.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ListaPautasComponent', () => {
  let component: ListaPautasComponent;
  let fixture: ComponentFixture<ListaPautasComponent>;
  let pautaServiceSpy: jasmine.SpyObj<PautaService>;

  beforeEach(async () => {
    const pautaServiceSpyObj = jasmine.createSpyObj('PautaService', [
      'getPautas',
    ]);
    pautaServiceSpyObj.getPautas.and.returnValue(
      of({ pautas: [], totalCount: 0 })
    );

    await TestBed.configureTestingModule({
      declarations: [ListaPautasComponent],
      imports: [MatPaginatorModule, BrowserAnimationsModule],
      providers: [{ provide: PautaService, useValue: pautaServiceSpyObj }],
    }).compileComponents();

    pautaServiceSpy = TestBed.inject(
      PautaService
    ) as jasmine.SpyObj<PautaService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaPautasComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve buscar pautas ao inicializar', waitForAsync(() => {
    const pautas = [
      { id: 1, titulo: 'Pauta 1', descricao: 'Descricao Pauta 1' },
      { id: 2, titulo: 'Pauta 2', descricao: 'Descricao Pauta 2' },
    ];
    const totalCount = 2;
    pautaServiceSpy.getPautas.and.returnValue(of({ pautas, totalCount }));

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.pautas).toEqual(pautas);
      expect(component.totalPautas).toBe(totalCount);
    });
  }));

  it('deve chamar getPautas quando onPageChange for chamado', () => {
    const evento = { pageIndex: 1, pageSize: 10, length: 10 };
    component.onPageChange(evento);

    expect(pautaServiceSpy.getPautas).toHaveBeenCalledWith(
      evento.pageIndex + 1,
      evento.pageSize
    );
  });

  it('deve atualizar pageIndex e pageSize quando onPageChange for chamado', () => {
    const evento = { pageIndex: 2, pageSize: 5, length: 5 };
    component.onPageChange(evento);

    expect(component.pageIndex).toBe(evento.pageIndex);
    expect(component.pageSize).toBe(evento.pageSize);
  });
});
