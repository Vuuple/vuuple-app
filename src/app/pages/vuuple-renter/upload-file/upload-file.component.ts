import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UploadFileService } from '../../../providers/uploadFile/upload-file.service';
import { RenterFactoryService } from '../../../providers/renter-factory/renter-factory.service';
import { RenterEscrowService } from '../../../providers/renter-escrow/renter-escrow.service';
import { RenterRegisterationService } from '../../../providers/renter-registration/renter-registeration.service';
import { Web3Service } from '../../../providers/web3/web3.service';
import { AuthService } from '../../../auth/core/auth.service';
import { SwarmService } from '../../../providers/swarm/swarm.service';
import { RenterFilesService } from '../../../providers/renter-files/renter-files.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
  providers: [
    Web3Service,
    RenterFilesService,
    RenterFactoryService,
    RenterRegisterationService,
    SwarmService,
    RenterEscrowService
  ]
})
export class UploadFileComponent implements OnInit {
  uplaodForm: FormGroup;
  error: string;
  userId = 1;
  cuurentUser;
  fileHash;
  fileName;
  fileSize;
  accountContract;
  uploadResponse = { status: '', message: '', filePath: '' };
  constructor(
    private formBuilder: FormBuilder,
    private uploadfile: UploadFileService,
    private rentersFactoryService: RenterFactoryService,
    private rentersFileService: RenterFilesService,

    private swarmService: SwarmService,
    private rentersRegistrationService: RenterRegisterationService,

    private web3Service: Web3Service,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.cuurentUser = this.authService.currentUser;
    this.fileSize = 1;
    this.getRenterData();

    this.uplaodForm = this.formBuilder.group({
      files: ['']
    });
  }
  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.fileName = file.name;
      // todo: need to conver byte to GB
      this.fileSize = 1;
      console.log(file, 'file');

      const reader = new FileReader();

      reader.readAsArrayBuffer(file);

      reader.onload = () => {
        // const typedarray = new Uint8Array(reader.result as ArrayBuffer);
        // console.log(typedarray, 'new Uint8Array(');
        // this.uplaodForm.get('files').setValue(typedarray);
        this.uplaodForm.get('files').setValue(reader.result);

        // this.spinner.hide();
      };
    }
  }

  onSubmit() {
    // const formData = new FormData();
    // formData.append('file', this.uplaodForm.get('files').value);
    // console.log(formData, 'form data ');

    // this.uploadfile
    //   .upload(formData, this.userId)
    //   .subscribe(res => (this.uploadResponse = res), err => (this.error = err));
    this.upload(this.uplaodForm.get('files').value);
  }
  async getRenterData() {
    this.accountContract = await this.rentersFactoryService.getRenterContract(
      this.cuurentUser.ethAddress
    );
    const getRenteredStorage = await this.rentersRegistrationService.getRenteredStorage(
      this.accountContract
    );
    console.log(getRenteredStorage, 'getRenteredStorage');

    const getUsedStorage = await this.rentersRegistrationService.getUsedStorage(
      this.accountContract
    );
    console.log(getUsedStorage, 'getUsedStorage');
    console.log(
      getUsedStorage + this.fileSize,
      '  getUsedStorage + this.fileSize'
    );

    console.log(
      getUsedStorage + this.fileSize <= getRenteredStorage,
      'compare storage'
    );

    const getRenterFiles = await this.rentersRegistrationService.getRenterFiles(
      this.accountContract
    );
    const active = await this.rentersRegistrationService.isActive(
      this.accountContract
    );

    const parent = await this.rentersFileService.getParentContract(
      getRenterFiles
    );
    const register = await this.rentersRegistrationService.getRegisterDate(
      this.accountContract
    );
    const renew = await this.rentersRegistrationService.getRenewalDate(
      this.accountContract
    );
    const now = await this.rentersRegistrationService.getNow(
      this.accountContract
    );
    const owner = await this.rentersRegistrationService.getContractOwner(
      this.accountContract
    );

    const fileOwner = await this.rentersFileService.getFileOwner(
      getRenterFiles
    );

    console.log(getRenterFiles, 'getRenterFiles');
    console.log(parent, 'parent');
    console.log(this.accountContract, 'contract');
    console.log(fileOwner, 'fileOwner');
    console.log(owner, 'owner');

    console.log(register, 'register');
    console.log(renew, 'renew');
    console.log(now, 'now');
    console.log(this.cuurentUser.ethAddress, 'this.cuurentUser.ethAddress');

    const compare = renew >= now;
    console.log(
      // renew.setMonth(renew.getMonth() + 1),
      renew,
      now,
      compare,
      'compare'
    );
  }
  /**    renterContract,
    bzzHash,
    fileName,
    size,
    fileType,
    bzzSchema,
    isEncrypted,
    encryptedKey */
  async saveToContract() {
    const test = await this.web3Service.unLockAccount(
      this.cuurentUser.ethAddress,
      ''
    );
    /**usedStorage +_size <= renteredStorage */
    console.log(this.cuurentUser.ethAddress, 'this.cuurentUser.ethAddress');
    console.log(test, 'test unlock');
    const tx = await this.rentersRegistrationService.addFileToStorage(
      this.accountContract,
      this.cuurentUser.ethAddress,
      this.fileHash,
      this.fileName,
      this.fileSize
    );
    console.log(tx, 'tx');
  }
  upload(file) {
    this.swarmService.uploadfile(file).then(s => {
      console.log(s, 's upload');
      this.fileHash = s;
      this.saveToContract();
    });
  }
}
