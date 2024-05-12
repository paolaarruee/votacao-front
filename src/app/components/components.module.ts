import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

import { NavbarComponent } from './navbar/navbar.component';
import { ListaPautasComponent } from './lista-pautas/lista-pautas.component';

@NgModule({
  declarations: [NavbarComponent, ListaPautasComponent],
  imports: [CommonModule, MatIconModule],
  exports: [NavbarComponent, ListaPautasComponent],
})
export class ComponentModule {}
