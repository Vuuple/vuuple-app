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
    // return await this.dataService
    //   .post('auth/login', credential)
    //   .subscribe(s => {
    //     localStorage.setItem('user', JSON.stringify(s.rs));
    //     this.currentUser = JSON.parse(localStorage.getItem('user'));
    //     console.log(this.currentUser, ' this.currentUser');
    //     console.log(s.rs, 's.rs');

    //     return this.currentUser != null && this.currentUser !== undefined;
    //   });

    return new Promise<any>((resolve, reject) => {
      this.dataService.post('users/login', credential).subscribe(s => {
        console.log(s);
        let user = s.user;
        user.token = s.token;
        console.log(user, 'user');

        localStorage.setItem('user', JSON.stringify(user));
        this.currentUser = JSON.parse(localStorage.getItem('user'));
        console.log(this.currentUser, ' this.currentUser');

        resolve(this.currentUser != null && this.currentUser !== undefined);
      });
    });
  }
  async registerClient(
    username: string,
    email: string,
    pwd: string,
    ethAddress: string,
    category: string,
    ip: string,
    enode: string
  ) {
    const client = {
      username: username,
      email: email,
      pwd: pwd,
      ethAddress: ethAddress,
      category: category,
      ip: ip,
      enode: enode
    };
    console.log(client);
    return new Promise<any>((resolve, reject) => {
      this.dataService.post('users/register', client).subscribe(s => {
        console.log(s);
      });
    });
  }
  getCuurentUser(): IUser {
    const user = localStorage.getItem('user');
    if (user != undefined) {
      this.currentUser = JSON.parse(user);
    }
    return this.currentUser;
  }

  getUserType(): Number {
    if (
      this.getCuurentUser().role == 'admin' ||
      this.getCuurentUser().role == 'superAdmin'
    ) {
      return 1;
    } else if (this.getCuurentUser().category == 'renter') {
      return 2;
    } else if (this.getCuurentUser().category == 'lender') {
      return 3;
    } else {
      return null;
    }
  }
  logout(): void {
    localStorage.removeItem('user');
    localStorage.clear();
    this.currentUser = null;
  }
}
