import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { PautaService } from 'src/app/core/services/pauta/pauta.service';
import { Pauta } from 'src/app/shared/interfaces/pauta';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { ExclusaoPautaComponent } from './exclusao-pauta/exclusao-pauta.component';
import { SessaoVotacao } from 'src/app/shared/interfaces/sessao-votacao';

@Component({
  selector: 'app-lista-pautas',
  templateUrl: './lista-pautas.component.html',
  styleUrls: ['./lista-pautas.component.scss'],
})
export class ListaPautasComponent implements OnInit {
  pautasAtivas: Pauta[] = [];
  pautas: Pauta[] = [];
  sessoes: SessaoVotacao[] = [];
  totalSessoes: number = 0;
  totalPautas: number = 0;
  pageSize: number = 6;
  pageIndex: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private pautaService: PautaService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getPautas();
    this.getSessoes();
  }

  getPautas(): void {
    this.pautaService
      .getPautas(this.pageIndex + 1, this.pageSize)
      .subscribe((data) => {
        this.pautaService
          .getSessoes(this.pageIndex + 1, this.pageSize)
          .subscribe((sessoesData) => {
            console.log(data);

            const sessoesArray = sessoesData.sessoes;
            const pautasComSessoesAtivas = data.pautas.filter((pauta) =>
              this.hasActiveSessao(pauta.id, sessoesArray)
            );
            this.pautas = pautasComSessoesAtivas;
            this.totalPautas = pautasComSessoesAtivas.length;
          });
      });
  }

  hasActiveSessao(pautaId: number, sessoes: any[]): boolean {
    const now = new Date().getTime();

    return sessoes.some(
      (sessao) =>
        sessao.pautaId === pautaId &&
        sessao.dataTermino !== undefined &&
        new Date(sessao.dataTermino).getTime() > now
    );
  }

  getSessoes(): void {
    this.pautaService
      .getSessoes(this.pageIndex + 1, this.pageSize)
      .subscribe((data) => {
        this.sessoes = data.sessoes;
        this.totalSessoes = data.totalCount;
      });
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getPautas();
  }

  openDetalhesDialog(pautaId: number): void {
    this.dialog.open(DetalhesComponent, {
      data: { pautaId },
    });
  }

  openConfirmacaoExclusaoDialog(): void {
    this.dialog.open(ExclusaoPautaComponent, {
      data: {},
    });
  }
}
