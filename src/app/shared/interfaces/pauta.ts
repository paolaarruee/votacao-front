import { Votos } from './votos';

export interface Pauta {
  id: number;
  titulo: string;
  descricao: string;
  votos?: Votos;
  categoria: CategoriaPauta;
}

export enum CategoriaPauta {
  CATEGORIA_1 = 'Agricultura e Pecuária',
  CATEGORIA_2 = 'Ciência e Tecnologia',
  CATEGORIA_3 = 'Comunicação e Mídia',
  CATEGORIA_4 = 'Cultura e Lazer',
  CATEGORIA_5 = 'Direitos Humanos e Justiça',
  CATEGORIA_6 = 'Economia e Finanças',
  CATEGORIA_7 = 'Educação',
  CATEGORIA_8 = 'Habitação e Urbanismo',
  CATEGORIA_9 = 'Infraestrutura e Transportes',
  CATEGORIA_10 = 'Meio Ambiente',
  CATEGORIA_11 = 'Política e Governança',
  CATEGORIA_12 = 'Saúde',
  CATEGORIA_13 = 'Segurança Pública',
}

export interface FiltrosPauta {
  categoria: CategoriaPauta;
}
