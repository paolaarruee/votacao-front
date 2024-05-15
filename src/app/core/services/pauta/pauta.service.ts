import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { Pauta } from 'src/app/shared/interfaces/pauta';
import { SessaoVotacao } from 'src/app/shared/interfaces/sessao-votacao';

@Injectable({
  providedIn: 'root',
})
export class PautaService {
  private baseUrl = environment.API_URL;

  constructor(private http: HttpClient) {}

  getPautas(
    page: number,
    limit: number
  ): Observable<{ pautas: Pauta[]; totalCount: number }> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http
      .get<Pauta[]>(`${this.baseUrl}pautas?page=${page}&limit=${limit}`, {
        headers,
        observe: 'response',
      })
      .pipe(
        map((response) => ({
          pautas: response.body as Pauta[],
          totalCount: Number(response.headers.get('x-total-count')),
        }))
      );
  }

  createPauta(pautaData: Pauta): Observable<Pauta> {
    return this.http.post<Pauta>(`${this.baseUrl}pauta`, pautaData);
  }

  createSessao(
    idPauta: number,
    sessaoData: SessaoVotacao
  ): Observable<SessaoVotacao> {
    return this.http.post<SessaoVotacao>(
      `${this.baseUrl}sessao/${idPauta}`,
      sessaoData
    );
  }
}
