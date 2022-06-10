import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { UserSignup } from "../_classes/user-signup.model";
import { SignupService } from '../_services/signup.service';
import { SigninService } from '../_services/signin.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signUpModel = new UserSignup('', '', '', '','');

  constructor(
    public signup:SignupService,
    private router: Router,
    public signin:SigninService,
    public flashMessageService: FlashMessagesService
  ) {
      if(this.signin.logIn()) {
        this.router.navigateByUrl('/home');
      }
    }

  onRegister() {
    this.signup.registerUser(this.signUpModel).subscribe((res) => {

      if(res.result) {
        this.signup.userData(res.token, res.result);
        this.flashMessageService.show('Signup Successfull.',{
          cssClass: 'alert-success toast-box',
          timeout: 2500
        });
        this.router.navigateByUrl('/home')
      }
    });
  }

  ngOnInit(): void {
  }

}
