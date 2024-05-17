import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-register-users',
  templateUrl: './register-users.component.html',
  styleUrls: ['./register-users.component.scss'],
})
export class RegisterUsersComponent {
  registerPauta = new FormGroup({
    id: new FormControl(''),
    nome: new FormControl(''),
    cpf: new FormControl(''),
    email: new FormControl(''),
    senha: new FormControl(''),
    admin: new FormControl(''),
  });

  onSubmit() {
    return true;
  }
}
