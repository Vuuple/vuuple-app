import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';
import { UserWalletService } from '../../providers/user-wallet/user-wallet.service';
import { Web3Service } from '../../providers/web3/web3.service';
import { LendersFactoryService } from '../../providers/lenders-factory/lenders-factory.service';
import { MustMatch } from '../../providers/helpers/MustMatch';
const networkPath = require('electron').remote.getGlobal('networkPath');
const path = require('path');
const getNodeKey = require('../../../assets/js/helpers/getNodeKey.js');
const publicIp = require('public-ip');

@Component({
  selector: 'app-lender-register',
  templateUrl: './lender-register.component.html',
  styleUrls: ['./lender-register.component.scss'],
  providers: [UserWalletService, Web3Service, LendersFactoryService]
})

// first create address
// when register , generate node key  files
// read node and set its value in enode
// call registerfactory contrct
// save to database
// route to pending view
export class LenderRegisterComponent implements OnInit {
  lenderRegisterForm: FormGroup;
  users: any[];
  accountPrivateKey: any;
  accountData: any;
  accountPublic: string;
  enode: any;
  errorMessage;
  Loading: boolean;
  bankAccount: string;
  constructor(
    private lendersFactoryService: LendersFactoryService,
    private web3Service: Web3Service,
    private userWallet: UserWalletService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.createAccount('');
    //this.getEnode();
    console.log(global, 'global');
  }

  ngOnInit() {
    this.lenderRegisterForm = this.formBuilder.group({
      username: ['', Validators.required],
      // bankAccount: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(7)]],
      confirmPassword : ['', Validators.required],
      staticIP: ['', Validators.required],
      ethereumAddress: ['', Validators.required],
      // enode : ['' , Validators.required ],
      termService: ['', Validators.required],
      privacyPolicy: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
  });
    this.getIp();
  }
  get f() { return this.lenderRegisterForm.controls; }

  lenderRegister() {
    this.savetocontract();
  }
  async getIp() {
    try {
      const ip = await publicIp.v4();
      console.log(ip, 'ip');
      this.lenderRegisterForm.patchValue({ staticIP: ip });
    } catch (error) {
      this.errorMessage = error;
    }
  }
  async getEnode() {
    try {
      const _enode = await getNodeKey();
      console.log(_enode, 'enode');

      if (_enode) {
        this.enode = _enode;
        console.log(this.enode, ' this.enode');

        // this.lenderRegisterForm.patchValue({ enode: _enode });
        this.saveToNodeServer();
      }
    } catch (error) {
      this.errorMessage = error;
    }
  }
  returnToLogin() {
    this.router.navigate(['/auth/login']);
  }
  createAccount(password) {
    let self = this;
    try {
      this.userWallet.generateKeys(function(_keys) {
        console.log(_keys, 'keys from home');

        // export keys
        self.userWallet.exportKeys(_keys, password, function(exResult) {
          console.log(exResult, 'exResult');
          self.accountPublic = '0x'.concat(exResult.address);
          if (self.web3Service.isVaildAddress(self.accountPublic)) {
            self.lenderRegisterForm.patchValue({
              ethereumAddress: self.accountPublic
            });
          }
          self.accountData = exResult;
          // self.recover(exResult);
          self.recover(exResult, password);
        });
        // try get private key
        // self.userWallet.recoverKeys()
      });
    } catch (error) {
      this.errorMessage = error;
    }
  }

  exportToFile(keyObject) {
    console.log('exporttofile func');
    try {
      const keyPath = path.join(
        networkPath,

        'examples/',
        '7nodes/',
        'keys/',
        'key'
      );

      this.userWallet.exportToFile(keyObject, keyPath, function(exFile) {
        console.log(exFile, 'exFile');
        console.log('exported to filestore');
      });
    } catch (error) {
      this.errorMessage = error;
    }
  }
  recover(keyObject, password) {
    console.log(password, 'password');
    console.log(keyObject, 'keyObject');

    this.userWallet
      .recoverKeys(password, keyObject)
      .then(privateKey => {
        this.accountPrivateKey = this.userWallet.buf2hex(privateKey);
        // this.getAddress(this.accountPrivateKey);
      })
      .catch(err => {
        this.errorMessage = err;
        console.error(err);
      });
  }
  // getAddress(privateKey) {
  //   this.userWallet.privateKeyToAddress(privateKey).then(data => {
  //     console.log(data, 'address');
  //     if (this.web3Service.isVaildAddress(data)) {
  //       this.lenderRegisterForm.patchValue({ ethereumAddress: data });
  //       this.savetocontract();
  //     }
  //   });
  // }
  savetocontract() {
    this.Loading = true ;
    this.lendersFactoryService
      .lenderRegisterSigned(
        10,
        this.accountPublic,
        this.accountPrivateKey,
        2000000000
      )
      .then(s => {
        console.log(s, 'save to contract');
        this.Loading = false ;
        if (s) {
          this.exportToFile(this.accountData);
          this.getEnode();
        }
      })
      .catch(err => {
        this.errorMessage = err;
        console.error(err);
      });
  }
  saveToNodeServer() {
    console.log(this.enode, 'this.enode');

    this.authService
      .registerClient(
        this.lenderRegisterForm.value.username,
        // this.lenderRegisterForm.value.bankAccount,
        this.lenderRegisterForm.value.email,
        this.lenderRegisterForm.value.password,
        this.lenderRegisterForm.value.ethereumAddress,
        'lender',
        this.lenderRegisterForm.value.staticIP,
        // this.lenderRegisterForm.value.enode
        this.enode
      )
      .then(s => {
        console.log(s, 's');

        this.router.navigate(['/auth/registerCompleted']);

        console.log(s, 'result');
      })
      .catch(err => {
        this.errorMessage = err;
        console.error(err);
      });
  }
  // getKeys() {
  //   if (this.password != undefined && this.keyObject != undefined) {
  //     this.userService
  //       .recoverKeys(this.password, this.keyObject)
  //       .then(privateKey => {
  //         this.privKey = this.userService.buf2hex(privateKey);

  //         console.log(privateKey, 'privateKey');

  //         this.userWallet.privateKeyToAddress(privateKey).then(data => {
  //           console.log(data, 'address');
  //           this.address = data;
  //           if (this.web3Service.isVaildAddress(data)) {
  //             this.hasValidKeys = true;
  //           } else {
  //             this.hasValidKeys = false;
  //           }
  //         });
  //       });
  //   }
  // }
  /**  recover(keyObject, password) {
  console.log(password, 'password');
  console.log(keyObject, 'keyObject');

  this.userWallet
    .recoverKeys(password, keyObject)
    .then(data => {
      console.log(data, 'data');

      this.accountPrivateKey = data;
      console.log(this.accountPrivateKey, ' this.accountPrivateKey');
    })
    .catch(err => {
      console.log(err, 'err');
    });

  console.log(this.accountPrivateKey, 'test     this.accountPrivateKey');
} */
}
