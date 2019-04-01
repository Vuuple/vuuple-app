import { Injectable } from '@angular/core';

import { IUser } from './user';

@Injectable()
export class AuthService {
  currentUser: IUser;
  redirectUrl: string;

  constructor() { }

  isLoggedIn(): boolean {
    //  console.log(this.currentUser, 'this.currentUser');

    return this.currentUser != undefined && this.currentUser != null;
  }

  login(userName: string, password: string): boolean {

    if (userName == 'admin@admin.com' && password == 'adminpw') {
      this.currentUser = {
        id: 1,
        userName: userName,
        token:null,
        isAdmin: true
      };
      return true;
    }
    else {
      return false;
    }
  }

  logout(): void {
    this.currentUser = null;
  }
}
