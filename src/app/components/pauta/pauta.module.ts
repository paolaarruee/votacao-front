import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ListaPautasComponent } from './lista-pautas/lista-pautas.component';
import { RegisterPautaComponent } from './register-pauta/register-pauta.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [HomeComponent, ListaPautasComponent, RegisterPautaComponent],
  imports: [CommonModule, MatCardModule, MatButtonModule],

  exports: [HomeComponent, ListaPautasComponent, RegisterPautaComponent],
})
export class PautaModule {}