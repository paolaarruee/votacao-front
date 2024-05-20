import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @ViewChild('menuNav', { static: true })
  menuNavRef!: ElementRef;

  public constructor(private authService: AuthenticationService) {}

  public toggleMenu() {
    const menuNav = this.menuNavRef.nativeElement;
    if (menuNav) {
      menuNav.classList.toggle('active');
    }
  }

  public logout(): void {
    this.authService.logout();
  }

  public get isAuthenticated(): boolean {
    return this.authService.isAuthenticated;
  }

  public get isAdmin(): boolean {
    return this.authService.isAdmin();
  }
}
