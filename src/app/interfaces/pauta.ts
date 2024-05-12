import { Votos } from "./votos";

export interface Pauta {
  id: number;
  titulo: string;
  descricao: string;
  votos?: Votos
}
