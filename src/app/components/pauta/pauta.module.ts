import { HomeComponent } from './home/home.component';
import { ListaPautasComponent } from './lista-pautas/lista-pautas.component';
import { RegisterPautaComponent } from './register-pauta/register-pauta.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { DetalhesComponent } from './lista-pautas/detalhes/detalhes.component';
import { ExclusaoPautaComponent } from './lista-pautas/exclusao-pauta/exclusao-pauta.component';
import { VotosComponent } from './lista-pautas/detalhes/votos/votos.component';

@NgModule({
  declarations: [
    HomeComponent,
    ListaPautasComponent,
    RegisterPautaComponent,
    DetalhesComponent,
    ExclusaoPautaComponent,
    VotosComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatDialogModule,
  ],

  exports: [
    HomeComponent,
    ListaPautasComponent,
    RegisterPautaComponent,
    DetalhesComponent,
    ExclusaoPautaComponent,
  ],
})
export class PautaModule {}
