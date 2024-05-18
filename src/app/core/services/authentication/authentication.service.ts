import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, pipe, tap } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { AccessToken } from 'src/app/shared/interfaces/auth';
import { Users } from 'src/app/shared/interfaces/users';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private baseUrl = environment.API_URL;

  private readonly TOKEN_KEY: string = 'token';

  public constructor(private http: HttpClient, private router: Router) {}

  public login(userData: Users): Observable<AccessToken> {
    return this.http.post<AccessToken>(`${this.baseUrl}entrar`, userData).pipe(
      tap(({ accessToken }: AccessToken) => {
        this.token = accessToken;
      })
    );
  }

  public logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigateByUrl('/entrar');
  }

  public isAdmin(): boolean {
    const token = this.token;
    if (token) {
      const decodedToken: any = jwt_decode.jwtDecode(token) as { role: number };
      return decodedToken.admin === 1;
    }

    return false;
  }

  public get isAuthenticated(): boolean {
    return !!this.token;
  }

  public get token(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  public set token(authToken: string | null) {
    if (authToken) {
      localStorage.setItem(this.TOKEN_KEY, authToken);
    } else {
      localStorage.removeItem(this.TOKEN_KEY);
    }
  }
}
