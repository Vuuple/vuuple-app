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
      this.dataService.post('auth/login', credential).subscribe(s => {
        localStorage.setItem('user', JSON.stringify(s.rs));
        this.currentUser = JSON.parse(localStorage.getItem('user'));
        console.log(this.currentUser, ' this.currentUser');
        console.log(s.rs, 's.rs');

        resolve(this.currentUser != null && this.currentUser !== undefined);
      });
    });
  }
  getCuurentUser() {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    return this.currentUser;
  }
  getUserType(): Number {
    if (this.getCuurentUser().isAdmin) {
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
