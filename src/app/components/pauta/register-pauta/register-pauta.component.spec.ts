import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPautaComponent } from './register-pauta.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PautaService } from 'src/app/core/services/pauta.service';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { Pauta } from 'src/app/shared/interfaces/pauta';
import { SessaoVotacao } from 'src/app/shared/interfaces/sessao-votacao';

describe('RegisterPautaComponent', () => {
  let component: RegisterPautaComponent;
  let fixture: ComponentFixture<RegisterPautaComponent>;
  let pautaServiceSpy: jasmine.SpyObj<PautaService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('PautaService', [
      'createPauta',
      'createSessao',
    ]);

    TestBed.configureTestingModule({
      declarations: [RegisterPautaComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [{ provide: PautaService, useValue: spy }],
    });

    fixture = TestBed.createComponent(RegisterPautaComponent);
    component = fixture.componentInstance;
    pautaServiceSpy = TestBed.inject(
      PautaService
    ) as jasmine.SpyObj<PautaService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
