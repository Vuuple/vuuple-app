import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../core/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Web3Service } from '../../providers/web3/web3.service';
import { UserWalletService } from '../../providers/user-wallet/user-wallet.service';
import { RenterFactoryService } from '../../providers/renter-factory/renter-factory.service';
import { ToastrService } from 'ngx-toastr';
import { MustMatch } from '../../providers/helpers/MustMatch';
const networkPath = require('electron').remote.getGlobal('networkPath');
const path = require('path');
const getNodeKey = require('../../../assets/js/helpers/getNodeKey.js');
const publicIp = require('public-ip');

@Component({
  selector: 'app-renter-register',
  templateUrl: './renter-register.component.html',
  styleUrls: ['./renter-register.component.scss'],
  providers: [UserWalletService, Web3Service, RenterFactoryService]
})
export class RenterRegisterComponent implements OnInit {
  renterRegisterForm: FormGroup;
  users: any[];
  srcImage: any;
  accountPrivateKey: any;
  accountData: any;
  accountPublic: string;
  enode: any;
  errorMessage;
  type = { Org: 0, Individual: 1 };
  currentType;
  submitted = false;
  Loading = false ;
  bankAccount: string;
  constructor(
    private rentersFactoryService: RenterFactoryService,
    private web3Service: Web3Service,
    private userWallet: UserWalletService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private toastr: ToastrService ,
    private router: Router
  ) {
    this.createAccount('');
  }

  ngOnInit() {
    this.renterRegisterForm = this.formBuilder.group({
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
    this.route.queryParams.subscribe(params => {
      const type = params['type'];
      console.log(type, ' type');

      if (type != undefined && type != null) {
        if (type == 'org') {
          // this.srcImage = '../../../assets/img/companyRenter.png';
          this.currentType = 0;
        } else {
          this.currentType = 1;
          // this.srcImage = '../../../assets/img/individualRenter.png';
        }
      }
    });
  }
  get f() { return this.renterRegisterForm.controls; }

  async getIp() {
    try {
      const ip = await publicIp.v4();
      console.log(ip, 'ip');
      this.renterRegisterForm.patchValue({ staticIP: ip });
    } catch (error) {
      this.errorMessage = error;
    }
  }
  renterRegister() {
    this.submitted = true;
    this.savetoContract();
  }
  returnToLogin() {
    this.router.navigate(['/auth/login']);
  }
  async getEnode() {
    try {
      const _enode = await getNodeKey();
      console.log(_enode, 'enode');

      if (_enode) {
        this.enode = _enode;
        // this.renterRegisterForm.patchValue({ enode: _enode });
        this.saveToNodeServer();
      }
    } catch (error) {
      this.errorMessage = error;
    }
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
            self.renterRegisterForm.patchValue({
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

  savetoContract() {
    console.log('sending to contract');
    this.Loading = true ;
    this.rentersFactoryService
      .renterRegisterSigned(
        this.currentType,
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
        this.renterRegisterForm.value.username,
        // this.renterRegisterForm.value.bankAccount,
        // this.bankAccount,
        this.renterRegisterForm.value.email,
        this.renterRegisterForm.value.password,
        this.renterRegisterForm.value.ethereumAddress,
        'renter',
        this.renterRegisterForm.value.staticIP,
        // this.renterRegisterForm.value.enode
        this.enode
      )
      .then(s => {
        this.router.navigate(['/auth/registerCompleted']);

        console.log(s, 'result');
      })
      .catch(err => {
        this.errorMessage = err;
        console.error(err);
      });
  }
}
