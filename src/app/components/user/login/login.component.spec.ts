import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { LoginComponent } from './login.component';
import { Users } from 'src/app/shared/interfaces/users';

// Serviços Mock
class MockAuthenticationService {
  login = jasmine.createSpy().and.returnValue(of({}));
}

class MockRouter {
  navigate = jasmine.createSpy();
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockAuthService: MockAuthenticationService;
  let mockRouter: MockRouter;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: AuthenticationService, useClass: MockAuthenticationService },
        { provide: Router, useClass: MockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    mockAuthService = TestBed.inject(AuthenticationService) as unknown as MockAuthenticationService;
    mockRouter = TestBed.inject(Router) as unknown as MockRouter;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve criar um formulário com dois controles', () => {
    expect(component.loginForm.contains('cpf')).toBeTruthy();
    expect(component.loginForm.contains('senha')).toBeTruthy();
  });

  it('deve tornar o controle cpf obrigatório', () => {
    const control = component.loginForm.get('cpf')!;
    control.setValue('');
    expect(control.valid).toBeFalsy();
  });

  it('deve tornar o controle senha obrigatório', () => {
    const control = component.loginForm.get('senha')!;
    control.setValue('');
    expect(control.valid).toBeFalsy();
  });

  it('deve chamar authService.login e navegar ao submeter com sucesso', () => {
    component.loginForm.setValue({
      cpf: '12345678901',
      senha: 'password',
    });
    component.onSubmit();

    expect(mockAuthService.login).toHaveBeenCalledWith({
      cpf: '12345678901',
      senha: 'password',
    });
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });

  it('deve exibir erro de login se authService.login falhar', () => {
    spyOn(console, 'error');
    mockAuthService.login.and.returnValue(throwError({ message: 'Login error' }));
    component.loginForm.setValue({
      cpf: '12345678901',
      senha: 'password',
    });
    component.onSubmit();

    expect(mockAuthService.login).toHaveBeenCalledWith({
      cpf: '12345678901',
      senha: 'password',
    });
    expect(mockRouter.navigate).not.toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith('Login error', { message: 'Login error' });
  });

  it('não deve chamar authService.login se o formulário for inválido', () => {
    component.loginForm.setValue({
      cpf: '',
      senha: '',
    });
    component.onSubmit();

    expect(mockAuthService.login).not.toHaveBeenCalled();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });
});
