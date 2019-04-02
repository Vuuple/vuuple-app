import { DataService } from './../../providers/http-provider/data.service';
import { Injectable } from '@angular/core';

import { IUser } from './user';

@Injectable()
export class AuthService {
  currentUser: IUser;

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
  logout(): void {
    localStorage.removeItem('user');
    this.currentUser = null;
  }
}
