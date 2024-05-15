import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { PautaService } from 'src/app/core/services/pauta/pauta.service';
import { Pauta } from 'src/app/shared/interfaces/pauta';

@Component({
  selector: 'app-lista-pautas',
  templateUrl: './lista-pautas.component.html',
  styleUrls: ['./lista-pautas.component.scss'],
})
export class ListaPautasComponent implements OnInit {
  pautas: Pauta[] = [];
  totalPautas: number = 0;
  pageSize: number = 6;
  pageIndex: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private pautaService: PautaService) {}

  ngOnInit(): void {
    this.getPautas();
  }

  getPautas(): void {
    this.pautaService
      .getPautas(this.pageIndex + 1, this.pageSize)
      .subscribe((data) => {
        this.pautas = data.pautas;
        this.totalPautas = data.totalCount;
      });
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getPautas();
  }
}
