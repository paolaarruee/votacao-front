import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from '../app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthenticationInterceptor } from './interceptors/authentication/authentication.interceptor';

@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    MatIconModule,
    AppRoutingModule,
    HttpClientModule,
    MatSnackBarModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true,
    },
  ],
  exports: [NavbarComponent],
})
export class CoreModule {}
