import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-choose-category',
  templateUrl: './choose-category.component.html',
  styleUrls: ['./choose-category.component.scss']
})
export class ChooseCategoryComponent implements OnInit {
  category : any ;
  constructor(private router : Router) { }

  ngOnInit() {
  }
  valueChange(values:any){
    this.category = values.target.defaultValue;
    console.log(this.category);
    this.router.navigate(['/auth/renterRegister'], { queryParams: { val : this.category} });
      }
  returnToLogin(){
    this.router.navigate(['/auth/login']);
   }
}
