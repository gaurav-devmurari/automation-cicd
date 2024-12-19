import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserLogin, UserLoginResponse } from '../models/user-login.model';
import { Router } from '@angular/router';
import { LoaderService } from '@common-services/loader.service';
import { DesignSystemService } from '@design-system/services/design-system.service';

@Injectable({
  providedIn: 'root',
})
export class UserLoginService {
  private readonly _baseUrl: string;
  constructor(
    private httpClient: HttpClient,
    private route: Router,
    private loader: LoaderService,
    private toastr: DesignSystemService
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
        this.toastr.toastr('Signed In', 'Welcome back', 'success', 3000);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      this.toastr.toastr(
        'Sign In Failed',
        'Username or Password is wrong',
        'danger',
        3000
      );
      return false;
    }
  }
}
