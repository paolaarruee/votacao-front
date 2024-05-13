import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [NavbarComponent],
  imports: [CommonModule, MatIconModule, AppRoutingModule],
  exports: [NavbarComponent],
})
export class CoreModule {}
