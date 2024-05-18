import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterUsersComponent } from './register-users/register-users.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginComponent, RegisterUsersComponent],
  imports: [CommonModule, ReactiveFormsModule],

  exports: [LoginComponent, RegisterUsersComponent],
})
export class UserModule {}
