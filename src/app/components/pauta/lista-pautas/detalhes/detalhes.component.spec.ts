import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { DetalhesComponent } from './detalhes.component';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
import { PautaService } from 'src/app/core/services/pauta/pauta.service';
import { SessaoVotacao } from 'src/app/shared/interfaces/sessao-votacao';

describe('DetalhesComponent', () => {
  let component: DetalhesComponent;
  let fixture: ComponentFixture<DetalhesComponent>;
  let mockPautaService: jasmine.SpyObj<PautaService>;

  beforeEach(async () => {
    mockPautaService = jasmine.createSpyObj('PautaService', [
      'getSessaoVotacao',
    ]);

    await TestBed.configureTestingModule({
      declarations: [DetalhesComponent],
      imports: [MatDialogModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { pautaId: 123 } },
        { provide: PautaService, useValue: mockPautaService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalhesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve chamar getSessaoVotacao e definir sessaoVotacao', fakeAsync(() => {
    const mockSessaoVotacao: SessaoVotacao = {
      id: 123,
      nomeSessao: 'Sessão de Teste',
      dataInicio: new Date().toISOString(),
      dataTermino: new Date().toISOString(),
      votos: 5,
      pautaId: 123,
    };

    mockPautaService.getSessaoVotacao.and.returnValue(of(mockSessaoVotacao));

    fixture.detectChanges();
    tick();

    expect(mockPautaService.getSessaoVotacao).toHaveBeenCalledWith(123);
    expect(component.sessaoVotacao).toEqual(mockSessaoVotacao);
  }));
});
