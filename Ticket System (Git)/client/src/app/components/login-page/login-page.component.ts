import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { Signin } from '../_classes/signin.model';
import { SigninService } from '../_services/signin.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  signInModel = new Signin('','')

  constructor(
    public signin:SigninService,
    private router: Router,
    public flashMessageService: FlashMessagesService
  ) {
    if (this.signin.logIn()) {
      this.signin.islogIn = true;
      this.router.navigateByUrl('/home');
    }
  }

  onSubmit() {
    this.signin.loginUser(this.signInModel).subscribe((res) => {

      if(res.result) {
        this.signin.userData(res.token, res.result);
        this.flashMessageService.show('Login Successfull.', {
          cssClass: 'toast-box alert-success',
          timeout: 2500
        });
        this.router.navigateByUrl('/home')
      }

      else {
        this.flashMessageService.show('Incorrect Username or Password',{
          cssClass: 'toast-box alert-danger',
          timeout: 3500
        });
      }
    });
  }

  ngOnInit(): void {
  }

}
