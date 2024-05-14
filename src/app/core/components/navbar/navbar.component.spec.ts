import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { By } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let menuNavElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [MatIconModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    menuNavElement = fixture.debugElement.query(
      By.css('.menu__nav')
    ).nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve alternar a classe menuNav para ativa quando menuNav existe', () => {

    const menuNavElement = document.createElement('div');
    menuNavElement.classList.add('menuNav');
    component.menuNavRef.nativeElement = menuNavElement;
    component.toggleMenu();

    expect(menuNavElement.classList.contains('active')).toBe(true);
  });
});
