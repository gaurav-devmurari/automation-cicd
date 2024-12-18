import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import {
  UserRegistrationDetails,
  UserRegistrationResponse,
} from '../models/user-registration.model';
import { Router } from '@angular/router';

@Injectable()
export class UserRegistrationService {
  private readonly _baseUrl: string;
  constructor(
    private httpClient: HttpClient,
    private route: Router
  ) {
    this._baseUrl = environment.apiUrl;
  }

  async userRegistration(
    registrationDetails: UserRegistrationDetails
  ): Promise<boolean> {
    try {
      const res = await firstValueFrom(
        this.httpClient.post<UserRegistrationResponse>(
          `${this._baseUrl}v1/user/createUser`,
          registrationDetails
        )
      );
      if (!res.statusCode) {
        this.route.navigate(['user/sign-in']);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('SignUp failed:', error);
      return false;
    }
  }
}
