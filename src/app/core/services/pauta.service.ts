import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { Pauta } from 'src/app/shared/interfaces/pauta';
import { SessaoVotacao } from 'src/app/shared/interfaces/sessao-votacao';

@Injectable({
  providedIn: 'root',
})
export class PautaService {
  private baseUrl = environment.API_URL;

  constructor(private http: HttpClient) {}

  getPautas(): Observable<Pauta[]> {
    return this.http.get<Pauta[]>(`${this.baseUrl}pautas`);
  }

  createPauta(pautaData: Pauta): Observable<Pauta> {
    return this.http.post<Pauta>(`${this.baseUrl}pauta`, pautaData);
  }

  getSessao(): Observable<SessaoVotacao[]> {
    return this.http.get<SessaoVotacao[]>(`${this.baseUrl}sessoes`);
  }

  createSessao(idPauta: number, sessaoData: SessaoVotacao): Observable<SessaoVotacao> {
    return this.http.post<SessaoVotacao>(`${this.baseUrl}sessao/${idPauta}`, sessaoData);
  }
}
