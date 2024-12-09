import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
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

  login(user: UserLogin) {
    this.httpClient
      .post<UserLoginResponse>(`${this._baseUrl}auth/log-in`, user, {
        withCredentials: true,
      })
      .subscribe((data) => {
        if (data.access_token) {
          this.tokenSubject.next(true);
          localStorage.setItem('token', data.access_token);
          this.route.navigate(['/pipeline/list']);
        }
      });
  }
}
