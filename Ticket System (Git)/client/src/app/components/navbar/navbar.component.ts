import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SigninService } from '../_services/signin.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    public signin: SigninService,
    private router: Router
  ) {
    console.log(this.signin.user);
   }

   logout() {
     this.signin.islogIn = false;
     localStorage.clear();
     this.router.navigateByUrl('/signin');
   }

  ngOnInit(): void {
  }

}
