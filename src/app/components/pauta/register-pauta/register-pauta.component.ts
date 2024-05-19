import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PautaService } from 'src/app/core/services/pauta/pauta.service';
import { CategoriaPauta, Pauta } from 'src/app/shared/interfaces/pauta';
import { SessaoVotacao } from 'src/app/shared/interfaces/sessao-votacao';
import { switchMap } from 'rxjs/operators';
import { ToastService } from 'src/app/core/services/toast/toast.service';

@Component({
  selector: 'app-register-pauta',
  templateUrl: './register-pauta.component.html',
  styleUrls: ['./register-pauta.component.scss'],
})
export class RegisterPautaComponent {
  public categorias = Object.entries(CategoriaPauta).map(([value, label]) => ({
    label,
    value,
  }));

  constructor(
    private pautaService: PautaService,
    private toastService: ToastService
  ) {}

  registerPauta = new FormGroup({
    id: new FormControl(''),
    titulo: new FormControl(''),
    descricao: new FormControl(''),
    pautaId: new FormControl(''),
    nomeSessao: new FormControl(''),
    dataInicio: new FormControl(''),
    duracaoMinutos: new FormControl(''),
    categoria: new FormControl(''),
  });

  onSubmit() {
    const novaPauta: Pauta = {
      id: Math.floor(Math.random() * 1000),
      titulo: this.registerPauta.get('titulo')?.value ?? '',
      descricao: this.registerPauta.get('descricao')?.value ?? '',
      categoria: (this.registerPauta.get('categoria')?.value ??
        '') as CategoriaPauta,
    };

    this.pautaService
      .createPauta(novaPauta)
      .pipe(
        switchMap(() => {
          const idPauta: number = novaPauta.id;
          const dataInicioValue = this.registerPauta.get('dataInicio')?.value;
          const dataInicioFormatted = dataInicioValue
            ? new Date(dataInicioValue)
                .toISOString()
                .replace('T', ' ')
                .replace('Z', '')
                .slice(0, 19)
            : new Date()
                .toISOString()
                .replace('T', ' ')
                .replace('Z', '')
                .slice(0, 19);
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
      .subscribe({
        next: () => {
          this.toastService.showMessage('Sessão de votação criada com sucesso');
        },
        error: () => {
          this.toastService.showMessage('Erro ao criar sessão de votação');
        },
      });
  }
}
