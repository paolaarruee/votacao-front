import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterUsersComponent } from './register-users/register-users.component';

@NgModule({
  declarations: [LoginComponent, RegisterUsersComponent],
  imports: [CommonModule],

  exports: [LoginComponent, RegisterUsersComponent],
})
export class UserModule {}
