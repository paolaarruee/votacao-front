import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pauta } from 'src/app/shared/interfaces/pauta';
import { SessaoVotacao } from 'src/app/shared/interfaces/sessao-votacao';

@Injectable({
  providedIn: 'root',
})
export class PautaService {
  private baseUrl = 'http://localhost:3333';

  constructor(private http: HttpClient) {}

  getPautas(): Observable<Pauta[]> {
    return this.http.get<Pauta[]>(`${this.baseUrl}/pautas`);
  }

  getSessao(): Observable<SessaoVotacao[]> {
    return this.http.get<SessaoVotacao[]>(`${this.baseUrl}/sessoes`);
  }
}
