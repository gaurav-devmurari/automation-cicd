import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import {
  UserRegistrationDetails,
  UserRegistrationResponse,
} from '../models/user-registration.model';

@Injectable()
export class UserRegistrationService {
  private readonly _baseUrl: string;
  constructor(private httpClient: HttpClient) {
    this._baseUrl = environment.apiUrl;
  }

  public userRegistration(
    registrationDetails: UserRegistrationDetails
  ): Observable<unknown> {
    return this.httpClient.post<UserRegistrationResponse>(
      `${this._baseUrl}v1/user/createUser`,
      registrationDetails
    );
  }
}
