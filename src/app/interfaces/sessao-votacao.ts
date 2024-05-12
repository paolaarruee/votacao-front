export interface SessaoVotacao {
  id: number;
  pautaId: number;
  nomeSessao: string;
  dataInicio: Date;
  duracaoMinutos?: number;
  votos?: number;
  dataTermino?: Date;
}
