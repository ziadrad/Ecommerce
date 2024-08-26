import { HttpClient } from '@angular/common/http';
import {
  Inject,
  Injectable,
  PLATFORM_ID,
} from '@angular/core';
import { Email_data, login_data, register_data, resetCode, token } from '../../interfaces/data';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Environment } from '../../../base/Environment';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: BehaviorSubject<any> = new BehaviorSubject(null);
  constructor(
    private _HttpClient: HttpClient,
    private _Route: Router,
    @Inject(PLATFORM_ID) private id: object
  ) {
    // this function is used to avoid function is undefined to server error
    if (isPlatformBrowser(id)) {
      if (localStorage.getItem('User_Token')) {
        this.decod_UserData();
        this.last_page_navegation();
      }
    }
  }

  // this function get last page user used and navigate to it
  last_page_navegation() {
    const last_page = localStorage.getItem('current_page');
   // this._Route.navigate([last_page]);
  }

  // this function connect to api and post registeration data of user to api
  signup(data: register_data): Observable<any> {
    return this._HttpClient.post(
      `${Environment.baseUrl}/api/v1/auth/signup`,
      data
    );
  }

  // this function connect to api and post login data of user to api
  signin(data: login_data): Observable<any> {
    return this._HttpClient.post(
      `${Environment.baseUrl}/api/v1/auth/signin`,
      data
    );
  }
    // this function connect to api and post Email of user to api And call ForgetPassword

  ForgetPassword(data: Email_data): Observable<any> {
    return this._HttpClient.post(
      `${Environment.baseUrl}/api/v1/auth/forgotPasswords`,
      data
    );
  }
    // this function connect to api and post Email of user to api And resetPassword
  resetPassword(data: login_data): Observable<token> {
    return this._HttpClient.put<token>(
      `${Environment.baseUrl}/api/v1/auth/resetPassword`,
      data
    );
  }
    // this function connect to api and post ResetCode of user to api for being checked

  VerifyResetPassword(data: resetCode): Observable<any> {
    return this._HttpClient.post(
      `${Environment.baseUrl}/api/v1/auth/verifyResetCode`,
      data
    );
  }

  // this function  decode user data from token and pass it to BehavourSubject type dataType
  decod_UserData() {
    const token = JSON.stringify(localStorage.getItem('User_Token'));
    const decode = jwtDecode(token);
    this.userData.next(decode);
  }
}
