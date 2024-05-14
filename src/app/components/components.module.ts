import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';

import { PautaModule } from './pauta/pauta.module';
import { UserModule } from './user/user.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AppRoutingModule,
    UserModule,
    PautaModule,
  ],
  exports: [],
})
export class ComponentModule {}
