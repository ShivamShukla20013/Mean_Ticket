import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

import { UserSignup } from '../_classes/user-signup.model';
import { Signin } from '../_classes/signin.model';
import { Api } from '../constants/api';

@Injectable({
  providedIn: 'root'
})
export class SigninService {

  authToken: any;
  user: Signin;
  signup: UserSignup;
  islogIn: boolean = false;


  constructor(private http: HttpClient) { }

  loginUser(user: Signin): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(Api.API_ENDPOINT+'/user/signin', user, {
      headers: headers,
    })
  }

  // Store User Data
  userData(token: any, result: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify({usrname: result.usrname,_id:result._id}));

    this.authToken = token;
    this.user = result;
  }

  // Get data from local storage
  checkToken() {
    this.authToken = localStorage.getItem('token');
    this.user = JSON.parse(localStorage.getItem('user')||'{}')
  }

  //Check Token Expiry
  logIn() {
    const support = new JwtHelperService();
    this.checkToken();
    const isExpired = !support.isTokenExpired(this.authToken);
    return isExpired;
  }

}
