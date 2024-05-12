import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { ListaPautasComponent } from './lista-pautas/lista-pautas.component';

@NgModule({
  declarations: [NavbarComponent, ListaPautasComponent],
  imports: [CommonModule],
  exports: [NavbarComponent, ListaPautasComponent],
})
export class ComponentModule {}
