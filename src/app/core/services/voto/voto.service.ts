import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { Votos } from 'src/app/shared/interfaces/votos';

@Injectable({
  providedIn: 'root',
})
export class VotoService {
  private baseUrl = environment.API_URL;

  constructor(private http: HttpClient) {}

  enviarVoto(pautaId: number, votoData: Votos): Observable<Votos> {
    return this.http.post<Votos>(`${this.baseUrl}voto/${pautaId}`, votoData);
  }

  getVotos(
    page: number,
    limit: number
  ): Observable<{ votos: Votos[]; totalCount: number }> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http
      .get<Votos[]>(
        `${this.baseUrl}votos?page=${page}&limit=${limit}`,
        {
          headers,
          observe: 'response',
        }
      )
      .pipe(
        map((response) => ({
          votos: response.body as Votos[],
          totalCount: Number(response.headers.get('x-total-count')),
        }))
      );
  }
}
