import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PautaService } from 'src/app/core/services/pauta.service';
import { Pauta } from 'src/app/shared/interfaces/pauta';
import { SessaoVotacao } from 'src/app/shared/interfaces/sessao-votacao';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-register-pauta',
  templateUrl: './register-pauta.component.html',
  styleUrls: ['./register-pauta.component.scss'],
})
export class RegisterPautaComponent {
  constructor(private pautaService: PautaService) {}

  registerPauta = new FormGroup({
    id: new FormControl(''),
    titulo: new FormControl(''),
    descricao: new FormControl(''),
    pautaId: new FormControl(''),
    nomeSessao: new FormControl(''),
    dataInicio: new FormControl(''),
    duracaoMinutos: new FormControl(''),
  });

  onSubmit() {
    const novaPauta: Pauta = {
      id: Math.floor(Math.random() * 1000),
      titulo: this.registerPauta.get('titulo')?.value ?? '',
      descricao: this.registerPauta.get('descricao')?.value ?? '',
    };

    this.pautaService
      .createPauta(novaPauta)
      .pipe(
        switchMap((pautaCriada: Pauta) => {
          console.log('Pauta criada com sucesso:', pautaCriada);

          const idPauta: number = novaPauta.id;
          const dataInicioValue = this.registerPauta.get('dataInicio')?.value;
          const dataInicioFormatted = dataInicioValue
          ? new Date(dataInicioValue).toISOString().replace('T', ' ').replace('Z', '').slice(0, 19)
          : new Date().toISOString().replace('T', ' ').replace('Z', '').slice(0, 19);
          const duracaoMinutosValue =
            this.registerPauta.get('duracaoMinutos')?.value;

          const novaSessao: SessaoVotacao = {
            pautaId: idPauta,
            nomeSessao: this.registerPauta.get('nomeSessao')?.value ?? '',
            dataInicio: dataInicioFormatted,
            duracaoMinutos: duracaoMinutosValue
              ? parseInt(duracaoMinutosValue)
              : 0,
          };
          return this.pautaService.createSessao(idPauta, novaSessao);
        })
      )
      .subscribe(
        (sessaoCriada: SessaoVotacao) => {
          console.log('Sessão de votação criada com sucesso:', sessaoCriada);
        },
        (error) => {
          console.error('Erro ao criar sessão de votação:', error);
        }
      );
  }
}
