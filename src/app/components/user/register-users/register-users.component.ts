import { Component } from '@angular/core';
<<<<<<< HEAD
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { switchMap } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { UsersService } from 'src/app/core/services/users.service';
import { Users } from 'src/app/shared/interfaces/users';
=======
import { FormGroup, FormControl } from '@angular/forms';
import { switchMap } from 'rxjs';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { UsersService } from 'src/app/core/services/user/users.service';
import { Pauta } from 'src/app/shared/interfaces/pauta';
import { SessaoVotacao } from 'src/app/shared/interfaces/sessao-votacao';
>>>>>>> main

@Component({
  selector: 'app-register-users',
  templateUrl: './register-users.component.html',
  styleUrls: ['./register-users.component.scss'],
})
export class RegisterUsersComponent {
  registerUser: FormGroup;

  constructor(
    private userService: UsersService,
    private authService: AuthenticationService,
    private toastService: ToastService
  ) {
    this.registerUser = new FormGroup({
      nome: new FormControl('', Validators.required),
      cpf: new FormControl('', [
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      senha: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      admin: new FormControl(false),
    });
  }

  public get isAdmin(): boolean {
    console.log(this.authService.isAdmin());
    return this.authService.isAdmin();
  }

  onSubmit() {
    if (this.registerUser.valid) {
      const user: Users = this.registerUser.value;

      if (!this.authService.isAdmin()) {
        user.admin = false;
      }

      this.userService.createPauta(user).subscribe(
        () => {
          this.toastService.showMessage('Usuário cadastrado com sucesso!');
          this.registerUser.reset();
        },
        (error) => {
          this.toastService.showMessage(
            'Erro ao cadastrar usuário: ' + error.message
          );
        }
      );
    } else {
      this.toastService.showMessage(
        'Por favor, preencha todos os campos corretamente.'
      );
    }
  }
}
