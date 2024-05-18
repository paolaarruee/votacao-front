import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ElementRef } from '@angular/core';
import { NavbarComponent } from './navbar.component';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { MatIconModule } from '@angular/material/icon';

class MockAuthenticationService {
  isAuthenticated = true;
  logout = jasmine.createSpy('logout');
}

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let mockAuthService: MockAuthenticationService;
  let mockMenuNavRef: ElementRef;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [MatIconModule],
      providers: [
        { provide: AuthenticationService, useClass: MockAuthenticationService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    mockAuthService = TestBed.inject(
      AuthenticationService
    ) as unknown as MockAuthenticationService;
    mockMenuNavRef = {
      nativeElement: document.createElement('div'),
    } as ElementRef;
    component.menuNavRef = mockMenuNavRef;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve alternar a classe menuNav para ativa quando menuNav existe', () => {
    const menuNavElement = document.createElement('div');
    menuNavElement.classList.add('menuNav');
    component.menuNavRef.nativeElement = menuNavElement;
    component.toggleMenu();

    expect(menuNavElement.classList.contains('active')).toBe(true);
  });

  it('deve chamar authService.logout ao deslogar', () => {
    component.logout();
    expect(mockAuthService.logout).toHaveBeenCalled();
  });

  it('deve retornar o estado de autenticação corretamente', () => {
    expect(component.isAuthenticated).toBe(true);

    mockAuthService.isAuthenticated = false;
    expect(component.isAuthenticated).toBe(false);
  });
});
