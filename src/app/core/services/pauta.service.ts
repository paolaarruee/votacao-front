import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Pauta } from 'src/app/shared/interfaces/pauta';

@Injectable({
  providedIn: 'root',
})
export class PautaService {
  private apiUrl = 'http://localhost:3333/pautas';

  constructor(private http: HttpClient) {}

  getPautas(page: number, limit: number): Observable<{ pautas: Pauta[], totalCount: number }> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<Pauta[]>(`${this.apiUrl}?page=${page}&limit=${limit}`, { headers, observe: 'response' }).pipe(
      map(response => ({
        pautas: response.body as Pauta[],
        totalCount: Number(response.headers.get('x-total-count'))
      }))
    );
  }
}
