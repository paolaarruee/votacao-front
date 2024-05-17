import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { VotoService } from 'src/app/core/services/voto/voto.service';
import { Votos } from 'src/app/shared/interfaces/votos';

@Component({
  selector: 'app-votos',
  templateUrl: './votos.component.html',
  styleUrls: ['./votos.component.scss'],
})
export class VotosComponent implements OnInit {
  pautaId: number;
  pageSize: number = 6;
  pageIndex: number = 0;
  votosArray: Votos[] = [];

  registerVoto = new FormGroup({
    opcao: new FormControl(''),
    userCpf: new FormControl(''),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private votoService: VotoService,
    private toastService: ToastService
  ) {
    this.pautaId = data.id;
  }

  ngOnInit(): void {
    this.getVotos();
  }

  onSubmit() {
    const novoVoto: Votos = {
      opcao: this.registerVoto.get('opcao')?.value ?? '',
      userCpf: this.registerVoto.get('userCpf')?.value ?? '',
    };
    const opcao = this.registerVoto.value.opcao;
    const userCpf = this.registerVoto.value.userCpf;

    if (opcao === 'sim' || opcao === 'nao') {
      const hasVoted = this.votosArray.some((voto) => voto.userCpf === userCpf);
      if (hasVoted) {
        this.toastService.showMessage('Você já votou nessa pauta!');
        return;
      }

      this.votoService.enviarVoto(this.pautaId, novoVoto).subscribe(
        () => {
          this.toastService.showMessage('Voto enviado com sucesso!');
          this.getVotos();
        },
        (error) => {
          this.toastService.showMessage('Erro ao enviar voto:', error);
        }
      );
    } else {
      this.toastService.showMessage('Selecione uma das opções');
    }
  }

  getVotos(): void {
    this.votoService
      .getVotos(this.pageIndex + 1, this.pageSize)
      .subscribe((data) => {
        this.votosArray = data.votos;
        console.log(this.votosArray);
      });
  }
}
