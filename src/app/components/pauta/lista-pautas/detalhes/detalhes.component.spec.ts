import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { DetalhesComponent } from './detalhes.component';
import {
  MatDialogModule,
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { of } from 'rxjs';
import { PautaService } from 'src/app/core/services/pauta/pauta.service';
import { SessaoVotacao } from 'src/app/shared/interfaces/sessao-votacao';

describe('DetalhesComponent', () => {
  let component: DetalhesComponent;
  let fixture: ComponentFixture<DetalhesComponent>;
  let mockPautaService: jasmine.SpyObj<PautaService>;
  let dialog: MatDialog;

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
        { provide: MatDialogRef, useValue: {} }, // Provide a mock MatDialogRef
        MatDialog, // Add MatDialog to providers
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalhesComponent);
    component = fixture.componentInstance;
    dialog = TestBed.inject(MatDialog); // Inject MatDialog
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

  it('Deve abrir o dialog', () => {
    spyOn(dialog, 'open');
    const button = fixture.debugElement.nativeElement.querySelector(
      '.modal__button__vote'
    );
    button.click();
    expect(dialog.open).toHaveBeenCalled();
  });
});
