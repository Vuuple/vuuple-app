import { DataService } from './../../providers/http-provider/data.service';
import { Injectable } from '@angular/core';

import { IUser } from './user';
// import { HttpClient,HttpResponse} from '@angular/common/http';

@Injectable()
export class AuthService {
  currentUser: IUser;
  userType = [{}];
  constructor(private dataService: DataService) {}

  isLoggedIn(): boolean {
    return !!this.getCuurentUser();
  }

  async login(email: string, password: string) {
    const credential = { email: email, pwd: password };
    return await this.dataService
      .post('auth/login', credential)
      .subscribe(s => {
        this.currentUser = s.rs;
        localStorage.setItem('user', JSON.stringify(this.currentUser));
        return this.currentUser != null && this.currentUser !== undefined;
      });
  }
  getCuurentUser() {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    return this.currentUser;
  }
  getUserType(): Number {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    if (this.currentUser.isAdmin) {
      return 1;
    } else if (this.currentUser.category == 'renter') {
      return 2;
    } else if (this.currentUser.category == 'lender') {
      return 3;
    } else {
      return null;
    }
  }
  logout(): void {
    localStorage.removeItem('user');
    this.currentUser = null;
  }
}
