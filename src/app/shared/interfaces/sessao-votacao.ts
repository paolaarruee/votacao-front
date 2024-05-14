export interface SessaoVotacao {
  id?: number;
  pautaId: number;
  nomeSessao: string;
  dataInicio: string;
  duracaoMinutos?: number;
  votos?: number;
  dataTermino?: string;
}
