import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PautaService } from 'src/app/core/services/pauta/pauta.service';
import { SessaoVotacao } from 'src/app/shared/interfaces/sessao-votacao';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.scss'],
})
export class DetalhesComponent implements OnInit {
  sessaoVotacao!: SessaoVotacao;
  pautaId: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,

    private pautaService: PautaService
  ) {
    this.pautaId = data.pautaId;
  }

  ngOnInit(): void {
    this.getSessaoVotacao();
    this.sessaoTerminada();
  }

  getSessaoVotacao(): void {
    this.pautaService.getSessaoVotacao(this.pautaId).subscribe(
      (data) => {
        this.sessaoVotacao = data;
      },
      (error) => {
        console.error('Erro ao obter detalhes da sessão:', error);
      }
    );
  }

  sessaoTerminada(): boolean {
    if (!this.sessaoVotacao || !this.sessaoVotacao.dataTermino) {
      return true;
    }

    const sessaoTerminada =
      new Date(this.sessaoVotacao.dataTermino) < new Date();

    return sessaoTerminada;
  }
}
