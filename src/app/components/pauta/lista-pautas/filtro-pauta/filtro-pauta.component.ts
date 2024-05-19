import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Subscription } from 'rxjs';

import { CategoriaPauta, FiltrosPauta } from 'src/app/shared/interfaces/pauta';

@Component({
  selector: 'app-filtro-pauta',
  templateUrl: './filtro-pauta.component.html',
  styleUrls: ['./filtro-pauta.component.scss'],
})
export class FiltroPautaComponent implements OnInit, OnDestroy {
  @Output() public filtrar: EventEmitter<FiltrosPauta> = new EventEmitter();

  private filterChanges$?: Subscription;

  public readonly categorias = Object.entries(CategoriaPauta).map(([label, value]) => ({
    label,
    value,
  }));

  public filtrosPauta!: FormGroup;

  public ngOnInit(): void {
    this.setFiltrosForm();
  }

  public ngOnDestroy(): void {
    this.filterChanges$?.unsubscribe();
  }

  private setFiltrosForm(): void {
    this.filtrosPauta = new FormGroup({ categoria: new FormControl("") });
    this.filterChanges$ = this.filtrosPauta.valueChanges.subscribe((filtros: FiltrosPauta) => {
      this.filtrar.emit(filtros)
    })
  }
}
