import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @ViewChild('menuNav', { static: true })
  menuNavRef!: ElementRef;

  toggleMenu() {
    const menuNav = this.menuNavRef.nativeElement;
    if (menuNav) {
      menuNav.classList.toggle('active');
    }
  }
}
