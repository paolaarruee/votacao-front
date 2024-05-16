import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { Votos } from 'src/app/shared/interfaces/votos';

@Injectable({
  providedIn: 'root',
})
export class VotoService {
  private baseUrl = environment.API_URL;

  constructor(private http: HttpClient) {}

  enviarVoto(pautaId: number, opcao: string) {
    const requestBody = {
      pautaId: pautaId,
      opcao: opcao,
    };

    return this.http.post<Votos>(`${this.baseUrl}voto/${pautaId}`, requestBody);
  }
}
