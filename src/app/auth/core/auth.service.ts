import { Injectable } from '@angular/core';

import { IUser } from './user';
import { HttpClient,HttpResponse} from '@angular/common/http';

@Injectable()
export class AuthService {
  currentUser: IUser;
  redirectUrl: string;

  constructor(private http: HttpClient) { }

  isLoggedIn(): boolean {
    //  console.log(this.currentUser, 'this.currentUser');

    return this.currentUser != undefined && this.currentUser != null;
  }

  login(userName: string, password: string): boolean {
    
    if (userName == 'admin@admin.com' && password == 'adminpw') {
      this.currentUser = {
        id: 1,
        userName: userName,
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
