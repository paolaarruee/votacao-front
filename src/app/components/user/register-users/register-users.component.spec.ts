import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { RegisterUsersComponent } from './register-users.component';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { UsersService } from 'src/app/core/services/users.service';
import { Users } from 'src/app/shared/interfaces/users';

// Serviços Mock
class MockAuthenticationService {
  isAdmin = jasmine.createSpy().and.returnValue(true);
}

class MockToastService {
  showMessage = jasmine.createSpy();
}

class MockUsersService {
  createPauta = jasmine.createSpy().and.returnValue(of({}));
}

describe('RegisterUsersComponent', () => {
  let component: RegisterUsersComponent;
  let fixture: ComponentFixture<RegisterUsersComponent>;
  let mockAuthService: MockAuthenticationService;
  let mockToastService: MockToastService;
  let mockUserService: MockUsersService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterUsersComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: AuthenticationService, useClass: MockAuthenticationService },
        { provide: ToastService, useClass: MockToastService },
        { provide: UsersService, useClass: MockUsersService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterUsersComponent);
    component = fixture.componentInstance;
    mockAuthService = TestBed.inject(
      AuthenticationService
    ) as unknown as MockAuthenticationService;
    mockToastService = TestBed.inject(
      ToastService
    ) as unknown as MockToastService;
    mockUserService = TestBed.inject(
      UsersService
    ) as unknown as MockUsersService;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve criar um formulário com 5 controles', () => {
    expect(component.registerUser.contains('nome')).toBeTruthy();
    expect(component.registerUser.contains('cpf')).toBeTruthy();
    expect(component.registerUser.contains('email')).toBeTruthy();
    expect(component.registerUser.contains('senha')).toBeTruthy();
    expect(component.registerUser.contains('admin')).toBeTruthy();
  });

  it('deve tornar o controle nome obrigatório', () => {
    const control = component.registerUser.get('nome')!;
    control.setValue('');
    expect(control.valid).toBeFalsy();
  });

  it('deve validar o comprimento do controle cpf', () => {
    const control = component.registerUser.get('cpf')!;
    control.setValue('123');
    expect(control.valid).toBeFalsy();

    control.setValue('12345678901');
    expect(control.valid).toBeTruthy();
  });

  it('deve validar o formato do controle email', () => {
    const control = component.registerUser.get('email')!;
    control.setValue('emailInvalido');
    expect(control.valid).toBeFalsy();

    control.setValue('teste@exemplo.com');
    expect(control.valid).toBeTruthy();
  });

  it('deve tornar o controle senha obrigatório e ter comprimento mínimo de 8', () => {
    const control = component.registerUser.get('senha')!;
    control.setValue('1234567');
    expect(control.valid).toBeFalsy();

    control.setValue('12345678');
    expect(control.valid).toBeTruthy();
  });

  it('deve chamar userService.createPauta e resetar o formulário ao submeter com sucesso', () => {
    spyOn(component.registerUser, 'reset');
    component.registerUser.setValue({
      nome: 'Usuário Teste',
      cpf: '12345678901',
      email: 'teste@exemplo.com',
      senha: '12345678',
      admin: true,
    });
    component.onSubmit();

    expect(mockUserService.createPauta).toHaveBeenCalled();
    expect(mockToastService.showMessage).toHaveBeenCalledWith(
      'Usuário cadastrado com sucesso!'
    );
    expect(component.registerUser.reset).toHaveBeenCalled();
  });

  it('deve mostrar mensagem de erro se userService.createPauta falhar', () => {
    mockUserService.createPauta.and.returnValue(
      throwError({ message: 'Erro' })
    );
    component.registerUser.setValue({
      nome: 'Usuário Teste',
      cpf: '12345678901',
      email: 'teste@exemplo.com',
      senha: '12345678',
      admin: true,
    });
    component.onSubmit();

    expect(mockToastService.showMessage).toHaveBeenCalledWith(
      'Erro ao cadastrar usuário: Erro'
    );
  });

  it('deve mostrar mensagem de erro de validação se o formulário for inválido', () => {
    component.registerUser.setValue({
      nome: '',
      cpf: '123',
      email: 'emailInvalido',
      senha: '123',
      admin: false,
    });
    component.onSubmit();

    expect(mockToastService.showMessage).toHaveBeenCalledWith(
      'Por favor, preencha todos os campos corretamente.'
    );
  });
});
