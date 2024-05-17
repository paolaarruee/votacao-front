import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { switchMap } from 'rxjs';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { UsersService } from 'src/app/core/services/user/users.service';
import { Pauta } from 'src/app/shared/interfaces/pauta';
import { SessaoVotacao } from 'src/app/shared/interfaces/sessao-votacao';

@Component({
  selector: 'app-register-users',
  templateUrl: './register-users.component.html',
  styleUrls: ['./register-users.component.scss'],
})
export class RegisterUsersComponent {
  constructor(
    private registerUser: UsersService,
    private toastService: ToastService
  ) {}

  registerPauta = new FormGroup({
    id: new FormControl(''),
    nome: new FormControl(''),
    cpf: new FormControl(''),
    email: new FormControl(''),
    senha: new FormControl(''),
    admin: new FormControl(''),
  });

  onSubmit() {
    const novaPauta: Pauta = {
      id: Math.floor(Math.random() * 1000),
      titulo: this.registerPauta.get('titulo')?.value ?? '',
      descricao: this.registerPauta.get('descricao')?.value ?? '',
    };

    // this.registerUser
    //   .createPauta(novaPauta)
    //   .pipe(
    //     switchMap(() => {
    //       const idPauta: number = novaPauta.id;
    //       const dataInicioValue = this.registerPauta.get('dataInicio')?.value;
    //       const dataInicioFormatted = dataInicioValue
    //         ? new Date(dataInicioValue)
    //             .toISOString()
    //             .replace('T', ' ')
    //             .replace('Z', '')
    //             .slice(0, 19)
    //         : new Date()
    //             .toISOString()
    //             .replace('T', ' ')
    //             .replace('Z', '')
    //             .slice(0, 19);
    //       const duracaoMinutosValue =
    //         this.registerPauta.get('duracaoMinutos')?.value;

    //       const novaSessao: SessaoVotacao = {
    //         pautaId: idPauta,
    //         nomeSessao: this.registerPauta.get('nomeSessao')?.value ?? '',
    //         dataInicio: dataInicioFormatted,
    //         duracaoMinutos: duracaoMinutosValue
    //           ? parseInt(duracaoMinutosValue)
    //           : 0,
    //       };
    //       return this.registerUser.createSessao(idPauta, novaSessao);
    // })
    // )
    // .subscribe({
    //   next: () => {
    //     this.toastService.showMessage('Sessão de votação criada com sucesso');
    //   },
    //   error: () => {
    //     this.toastService.showMessage('Erro ao criar sessão de votação');
    //   },
    // });
    return true;
  }
}
