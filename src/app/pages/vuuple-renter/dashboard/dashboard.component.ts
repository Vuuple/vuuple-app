import { RenterFilesService } from './../../../providers/renter-files/renter-files.service';
import { Component, OnInit } from '@angular/core';
import { Router, Params } from '@angular/router';
import { ServerApiService } from '../../../providers/server-api/server-api.service';
import { RenterFactoryService } from '../../../providers/renter-factory/renter-factory.service';
import { RenterRegisterationService } from '../../../providers/renter-registration/renter-registeration.service';
import { AuthService } from '../../../auth/core/auth.service';
import { SwarmService } from '../../../providers/swarm/swarm.service';
// const path = require('path');
const networkPath = require('electron').remote.getGlobal('networkPath');

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [
    SwarmService,
    RenterFactoryService,
    RenterRegisterationService,
    RenterFilesService
  ]
})
export class DashboardComponent implements OnInit {
  rentedStorage;
  cuurentUser;
  accountContract;
  files;
  index;
  usedStorage;
  fileContract;
  constructor(
    private router: Router,
    private rentersFactoryService: RenterFactoryService,

    private renterFileService: RenterFilesService,
    private rentersRegistrationService: RenterRegisterationService,

    private swarmService: SwarmService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.cuurentUser = this.authService.currentUser;
    this.getRenterData();
  }
  uploadFile() {
    this.router.navigate(['/pages/renter/uploadFile']);
  }
  async getRenterData() {
    const x = await this.rentersFactoryService.getRenterIndex();
    console.log(x, 'index');
    this.accountContract = await this.rentersFactoryService.getRenterContract(
      this.cuurentUser.ethAddress
    );
    console.log(this.cuurentUser.ethAddress, '  this.  address');
    console.log(this.accountContract, '  this.accountContract');

    if (
      this.accountContract != '0x0000000000000000000000000000000000000000' ||
      this.accountContract != '0x0'
    ) {
      this.rentedStorage = await this.rentersRegistrationService.getRenteredStorage(
        this.accountContract
      );
      this.usedStorage = await this.rentersRegistrationService.getUsedStorage(
        this.accountContract
      );

      this.fileContract = await this.rentersRegistrationService.getRenterFiles(
        this.accountContract
      );
      console.log(this.fileContract, '  this.fileContract');
      if (this.fileContract != '0x0000000000000000000000000000000000000000') {
        this.getFiles();
      }
    }
  }

  /** uint _size,
            string _name,

        string _fileType,
        uint _bzzSchema,
        bool _isEncrypted,
        string _encryptedKey */
  async getFiles() {
    this.files = [];
    this.index = await this.renterFileService.getIndex(this.fileContract);
    console.log(this.index, 'this.index');

    for (let x = 0; x < this.index; x++) {
      const hash = await this.renterFileService.getFileHashByIndex(
        this.fileContract,
        x
      );
      console.log(x, 'x');
      console.log(hash, 'hash');
      //7ec5d5e74e3742fafdaf820611eb1daed7cc2953a3e3cac07ff9c881e21ae8a6
      let file = await this.renterFileService.getFileByHash(
        this.fileContract,
        hash
      );
      // file[hash] = hash;
      console.log(file, 'file');

      this.files.push(file);
    }
    console.log(this.files, '  this.files');
  }
  download(hash) {
    console.log('download');
    console.log(hash, 'hash');

    this.swarmService.downloadfileto(hash, networkPath + hash).then(s => {
      console.log(s, 'swarm file');
    });
  }
}
