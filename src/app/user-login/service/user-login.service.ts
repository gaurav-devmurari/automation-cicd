import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserLogin, UserLoginResponse } from '../models/user-login.model';


@Injectable()
export class UserLoginService {
  private readonly _baseUrl: string;
  constructor(
    private httpClient: HttpClient
  ) {
    this._baseUrl = environment.apiUrl;
  }

  public login(user: UserLogin): Observable<UserLoginResponse> {
    return this.httpClient.post<UserLoginResponse>(
      `${this._baseUrl}auth/log-in`,
      user
    )
  }
}
