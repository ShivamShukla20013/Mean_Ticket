import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { SigninService } from '../_services/signin.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    public signin: SigninService,
    private router: Router,
    public flashMessageService: FlashMessagesService
  ) {
    console.log(this.signin.user);
   }

   logout() {
     this.signin.islogIn = false;
     localStorage.clear();
     this.flashMessageService.show('Log out Successfully.',{
      cssClass: 'alert-success toast-box',
      timeout: 2500
    })
     this.router.navigateByUrl('/signin');
   }

  ngOnInit(): void {
  }

}
