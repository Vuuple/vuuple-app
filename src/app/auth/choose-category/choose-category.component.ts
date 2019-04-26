import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-choose-category',
  templateUrl: './choose-category.component.html',
  styleUrls: ['./choose-category.component.scss']
})
export class ChooseCategoryComponent implements OnInit {
  category: any;
  constructor(private router: Router) {}

  ngOnInit() {}
  // setAccountType(val) {
  //   if (val == 0) {
  //     this.router.navigate(['/auth/renterRegister'], {
  //       queryParams: { type: 'org' }
  //     });
  //   } else {
  //     this.router.navigate(['/auth/renterRegister'], {
  //       queryParams: { type: 'Individual' }
  //     });
  //   }
  // }
  // valueChange(values: any) {
  //   this.category = values.target.defaultValue;
  //   console.log(this.category, 'category');
  //   this.router.navigate(['/auth/renterRegister'], {
  //     queryParams: { type: this.category }
  //   });
  // }
  returnToLogin() {
    this.router.navigate(['/auth/login']);
  }
}
