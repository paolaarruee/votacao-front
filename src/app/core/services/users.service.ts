import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { Users } from 'src/app/shared/interfaces/users';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private baseUrl = environment.API_URL;

  constructor(private http: HttpClient) {}

  createPauta(pautaData: Users): Observable<Users> {
    return this.http.post<Users>(`${this.baseUrl}cadastrar`, pautaData);
  }
}
