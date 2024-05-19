import { Votos } from './votos';

export interface Pauta {
  id: number;
  titulo: string;
  descricao: string;
  votos?: Votos;
  categoria: CategoriaPauta;
}

export enum CategoriaPauta {
  CATEGORIA_1 = '1',
  CATEGORIA_2 = '2'
}

export interface FiltrosPauta {
  categoria: CategoriaPauta;
}
