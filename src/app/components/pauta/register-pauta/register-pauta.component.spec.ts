import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterPautaComponent } from './register-pauta.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PautaService } from 'src/app/core/services/pauta/pauta.service';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { CategoriaPauta, Pauta } from 'src/app/shared/interfaces/pauta';
import { SessaoVotacao } from 'src/app/shared/interfaces/sessao-votacao';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('Componente RegisterPauta', () => {
  let component: RegisterPautaComponent;
  let fixture: ComponentFixture<RegisterPautaComponent>;
  let pautaService: jasmine.SpyObj<PautaService>;

  beforeEach(async () => {
    pautaService = jasmine.createSpyObj('PautaService', [
      'createPauta',
      'createSessao',
    ]);

    await TestBed.configureTestingModule({
      declarations: [RegisterPautaComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        MatSnackBarModule,
        BrowserAnimationsModule,
      ],
      providers: [{ provide: PautaService, useValue: pautaService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPautaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('deve enviar o formulário com sucesso', () => {
    spyOn(Math, 'random').and.returnValue(0.5);

    const mockPauta: Pauta = {
      id: 500,
      titulo: 'Título de Teste',
      descricao: 'Descrição de Teste',
      categoria: CategoriaPauta.CATEGORIA_1,
    };
    const mockSessao: SessaoVotacao = {
      pautaId: 500,
      nomeSessao: 'Sessão de Teste',
      dataInicio: '2024-05-14 00:00:00',
      duracaoMinutos: 60,
    };

    pautaService.createPauta.and.returnValue(of(mockPauta));
    pautaService.createSessao.and.returnValue(of(mockSessao));

    component.registerPauta.patchValue({
      titulo: 'Título de Teste',
      descricao: 'Descrição de Teste',
      categoria: CategoriaPauta.CATEGORIA_1,
      nomeSessao: 'Sessão de Teste',
      dataInicio: '2024-05-14',
      duracaoMinutos: '60',
    });

    component.onSubmit();

    expect(pautaService.createPauta).toHaveBeenCalledWith({
      id: 500,
      titulo: 'Título de Teste',
      descricao: 'Descrição de Teste',
      categoria: CategoriaPauta.CATEGORIA_1,
    });
    expect(pautaService.createSessao).toHaveBeenCalledWith(500, {
      pautaId: 500,
      nomeSessao: 'Sessão de Teste',
      dataInicio: '2024-05-14 00:00:00',
      duracaoMinutos: 60,
    });
  });
});
