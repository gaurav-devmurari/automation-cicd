import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserLogin, UserLoginResponse } from '../models/user-login.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserLoginService {
  private readonly _baseUrl: string;
  constructor(
    private httpClient: HttpClient,
    private route: Router
  ) {
    this._baseUrl = environment.apiUrl;
  }

  private tokenSubject = new Subject<boolean>();
  token$ = this.tokenSubject.asObservable();

  async login(user: UserLogin): Promise<boolean> {
    try {
      const data = await firstValueFrom(
        this.httpClient.post<UserLoginResponse>(
          `${this._baseUrl}auth/log-in`,
          user
        )
      );

      if (data?.access_token) {
        this.tokenSubject.next(true);
        localStorage.setItem('token', data.access_token);
        this.route.navigate(['/pipeline/list']);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  }
}
