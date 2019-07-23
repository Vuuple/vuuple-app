import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ServerApiService } from '../../../providers/server-api/server-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from '../../../providers/token/token.service';

@Component({
  selector: 'app-token-request-details',
  templateUrl: './token-request-details.component.html',
  styleUrls: ['./token-request-details.component.scss'],
  providers: [TokenService]
})
export class TokenRequestDetailsComponent implements OnInit {
  request;
  id;
  constructor(
    private serverApiService: ServerApiService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private tokenService: TokenService,

    private router: Router
  ) {}

  /** type
 *    const ethTxHash = req.body.ethTxHash;
    // const bankTxId = req.body.bankTxId;
    const status = req.body.status;
    // const tokenAmount = req.body.tokenAmount;
    // const rate = req.body.rate;
    // const depositAmount = req.body.depositAmount;
    const comment = req.body.comment;
 */
  myForm: FormGroup;
  ngOnInit() {
    this.myForm = this.buildForm();
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      console.log(this.id, ' this.id');

      if (this.id != undefined && this.id != null) {
        this.serverApiService.getTokenTransById(this.id).subscribe(data => {
          console.log(data);
          this.request = data[0]['tokenTransactions'][0];
          this.request['ethAddress'] = data[0]['ethAddress'];
          console.log(this.request, '  if this.request');
          //this.test();
          /**LastUpdateDTime: "2019-07-11T13:27:18.079Z"
bankTxId: "54s5df45sd4f5"
createDTime: "2019-07-11T13:27:18.079Z"
createdBy: "5d2228248f71674bd0acd452"
depositAmount: 50
ethAddress: "0xefd4b7f9c8549666712815211dfb401cb4ed0f23"
ethTxHash: null
lastUpdatedBy: "5d2228248f71674bd0acd452"
rate: 1
status: "pending"
tokenAmount: 50
type: "in" */
          if (this.request) {
            this.myForm.patchValue({
              ethTxHash: this.request.ethTxHash,
              bankTxId: this.request.bankTxId,
              status: this.request['status'],
              tokenAmount: this.request['tokenAmount'],
              rate: this.request['rate'],
              depositAmount: this.request['depositAmount'],
              comment: this.request['depositAmount']
            });
          }
          if (this.request['type'] == 'out') {
            this.myForm.controls.bankTxId.disable();
          }

          console.log(this.myForm, 'value');
        });
      }
    });
    console.log(this.request, '   this.request');
  }
  buildForm() {
    return this.fb.group({
      ethTxHash: [{ value: null }],
      bankTxId: [{ value: null }, [Validators.required]],
      status: [null, [Validators.required]],
      tokenAmount: [null, [Validators.required]],
      rate: [null, [Validators.required]],
      depositAmount: [null, [Validators.required]],
      comment: ['']
    });
  }
  approve() {
    this.myForm.controls.status.setValue('approved');

    if (this.request['type'] == 'in') {
      // call smart contract first
      this.transferToken().then(s => {
        console.log(s, 'ssss');

        this.myForm.controls.ethTxHash.setValue(s.tx);
        console.log(this.myForm.value, 'value');
        this.savePurchase();
      });
    } else {
      this.saveRedeem();
    }
  }
  reject() {
    try {
      this.myForm.controls.status.setValue('rejected');

      if (this.request['type'] == 'in') {
        // call smart contract first
        this.savePurchase();
      } else {
        this.saveRedeem();
      }
    } catch (error) {
      console.log(error, 'error');
    }
  }

  async transferToken() {
    console.log(
      this.request['ethAddress'],
      this.myForm.value.tokenAmount,
      'check '
    );

    return await this.tokenService.transfer(
      this.request['ethAddress'],
      this.myForm.value.tokenAmount
    );
  }
  savePurchase() {
    try {
      this.serverApiService
        .managePurchase(this.id, this.myForm.value)
        .subscribe(s => {
          console.log(s, 'saved to db');
        });
    } catch (error) {
      console.log(error, 'error');
    }
  }
  saveRedeem() {
    try {
      this.serverApiService
        .manageRedeem(this.id, this.myForm.value)
        .subscribe(s => {
          console.log(s, 'saved to db');
        });
    } catch (error) {
      console.log(error, 'error');
    }
  }
}
