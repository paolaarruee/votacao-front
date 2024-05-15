import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListaPautasComponent } from './lista-pautas.component';
import { of } from 'rxjs';
import { PautaService } from 'src/app/core/services/pauta/pauta.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';

describe('ListaPautasComponent', () => {
  let component: ListaPautasComponent;
  let fixture: ComponentFixture<ListaPautasComponent>;
  let pautaServiceSpy: jasmine.SpyObj<PautaService>;

  beforeEach(async () => {
    const pautaServiceSpyObj = jasmine.createSpyObj('PautaService', [
      'getPautas',
      'getSessoes',
    ]);
    pautaServiceSpyObj.getPautas.and.returnValue(
      of({ pautas: [], totalCount: 0 })
    );
    pautaServiceSpyObj.getSessoes.and.returnValue(
      of({ sessoes: [], totalCount: 0 })
    );

    await TestBed.configureTestingModule({
      declarations: [ListaPautasComponent],
      imports: [MatPaginatorModule, BrowserAnimationsModule, MatDialogModule],
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

  it('deve atualizar pageIndex e pageSize quando onPageChange for chamado', () => {
    const evento = { pageIndex: 2, pageSize: 5, length: 5 };
    component.onPageChange(evento);

    expect(component.pageIndex).toBe(evento.pageIndex);
    expect(component.pageSize).toBe(evento.pageSize);
  });

  it('deve filtrar pautas com base em sessoes ativas', () => {
    const mockPautas = [
      { id: 1, titulo: 'Titulo da pauta 1', descricao: 'Descricao da pauta 1' },
      { id: 2, titulo: 'Titulo da pauta 2', descricao: 'Descricao da pauta 2' },
      { id: 3, titulo: 'Titulo da pauta 1', descricao: 'Descricao da pauta 3' },
    ];
    const now = new Date();

    const dataTermino = new Date(now.getTime() + 10 * 60000);

    const mockSessoes = [
      {
        id: 1,
        nomeSessao: 'Sessão 1',
        dataInicio: now.toISOString(),
        dataTermino: dataTermino.toISOString(),
        votos: 5,
        pautaId: 1,
      },
    ];

    pautaServiceSpy.getPautas.and.returnValue(
      of({ pautas: mockPautas, totalCount: mockPautas.length })
    );

    pautaServiceSpy.getSessoes.and.returnValue(
      of({ sessoes: mockSessoes, totalCount: mockSessoes.length })
    );

    component.getPautas();

    expect(component.pautas.length).toBe(1);
    expect(component.pautas[0].id).toBe(1);
  });

  it('deve retornar verdadeiro se a pauta tem sessao ativa', () => {
    const now = new Date();

    const dataTermino = new Date(now.getTime() + 10 * 60000);

    const mockSessoes = [
      {
        id: 1,
        nomeSessao: 'Sessão 1',
        dataInicio: now.toISOString(),
        dataTermino: dataTermino.toISOString(),
        votos: 5,
        pautaId: 1,
      },
    ];
    const pautaId = 1;

    const result = component.hasActiveSessao(pautaId, mockSessoes);

    expect(result).toBeTruthy();
  });

  it('deve retornar falso se a pauta nao tem sessao ativa', () => {
    const pautaId = 1;
    const sessoes = [{ pautaId: 2, dataTermino: new Date().toISOString() }];
    expect(component.hasActiveSessao(pautaId, sessoes)).toBeFalsy();
  });
});
