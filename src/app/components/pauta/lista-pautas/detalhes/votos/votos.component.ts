import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { VotoService } from 'src/app/core/services/voto/voto.service';

@Component({
  selector: 'app-votos',
  templateUrl: './votos.component.html',
  styleUrls: ['./votos.component.scss'],
})
export class VotosComponent implements OnInit {
  pautaId: number;

  registerVoto = new FormGroup({
    opcao: new FormControl(''),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private votoService: VotoService,
    private toastService: ToastService
  ) {
    this.pautaId = data.id;
  }

  ngOnInit(): void {}

  onSubmit() {
    const opcao = this.registerVoto.value.opcao;
    if (opcao === 'sim' || opcao === 'nao') {
      this.votoService.enviarVoto(this.pautaId, opcao).subscribe(
        () => {
          this.toastService.showMessage('Voto enviado com sucesso!');
        },
        (error) => {
          this.toastService.showMessage('Erro ao enviar voto:', error);
        }
      );
    } else {
      this.toastService.showMessage('Selecione uma das opções');
    }
  }
}
