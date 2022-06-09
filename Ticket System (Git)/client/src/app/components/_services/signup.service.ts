import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { UserSignup } from '../_classes/user-signup.model';
import { Api } from '../constants/api';


@Injectable({
  providedIn: 'root'
})
export class SignupService {

  user: UserSignup;

  constructor(private http: HttpClient) { }

  registerUser(user: UserSignup): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(Api.API_ENDPOINT+'/user/signup', user,{
      headers: headers,
    });
  }

  userData(token: any, result: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify({usrname: result.usrname,_id:result._id}));

    this.user = result;
  }

}
