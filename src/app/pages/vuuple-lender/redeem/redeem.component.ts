import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenService } from './../../../providers/token/token.service';

@Component({
  selector: 'app-redeem',
  templateUrl: './redeem.component.html',
  styleUrls: ['./redeem.component.scss'],
  providers: [TokenService]
})
export class RedeemComponent implements OnInit {
  
  redForm: FormGroup;
  adminAddress = "0x9186eb3d20cbd1f5f992a950d808c4495153abd5";
  constructor(
    private formBuilder: FormBuilder,
    private tokenService: TokenService
    ) { }

  ngOnInit() {
    this.redForm = this.formBuilder.group({
      tokensToRed: ['', Validators.required]
    });
  }
async redeemTokens(){
  if (this.redForm.invalid) {
    return;
}
const transfer = await this.tokenService.transfer(this.adminAddress, this.redForm.value.tokensToRed);
console.log("tokens redeemed");
}
}
