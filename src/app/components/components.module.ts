import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from '../app-routing.module';

import { NavbarComponent } from './navbar/navbar.component';

import { PautaModule } from './pauta/pauta.module';
import { UserModule } from './user/user.module';

@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    MatIconModule,
    UserModule,
    PautaModule,
  ],
  exports: [NavbarComponent],
})
export class ComponentModule {}
