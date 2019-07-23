import { Component, OnInit } from '@angular/core';
import { ServerApiService } from '../../../providers/server-api/server-api.service';
import { PagerService } from '../../../providers/pagesService/pager.service';
import { TokenService } from '../../../providers/token/token.service';
import { LendersFactoryService } from '../../../providers/lenders-factory/lenders-factory.service';
import { RenterFactoryService } from '../../../providers/renter-factory/renter-factory.service';
import { LenderEscrowService } from '../../../providers/lenders-escrow/lenders-escrow.service';
import { RenterRegisterationService } from '../../../providers/renter-registration/renter-registeration.service';
import { RenterEscrowService } from '../../../providers/renter-escrow/renter-escrow.service';
import { LendersRegistrationService } from '../../../providers/lenders-registration/lenders-registration.service';
import { AuthService } from '../../../auth/core/auth.service';

@Component({
  selector: 'app-node-list',
  templateUrl: './node-list.component.html',
  styleUrls: ['./node-list.component.scss'],
  providers: [
    TokenService,
    LendersFactoryService,
    RenterFactoryService,
    LenderEscrowService,
    RenterRegisterationService,
    LendersRegistrationService,
    RenterEscrowService
  ]
})
export class NodeListComponent implements OnInit {
  TotalCompanyRenter = '15';
  nodes: any = [];
  pager: any;
  pagedItems: any;
  pages: any[];
  ethaddress: any;
  renterEthaddress: any;
  lenderEthaddress: any;
  accountContract: any;
  renterID: any;
  lenderID: any;
  // pages: { totalItems: number; currentPage: number; pageSize: number; totalPages: number; startPage: number; endPage: number; startIndex: number; endIndex: number; pages: number[]; };
  constructor(
    private serverApiService: ServerApiService,
    private pagerService: PagerService,
    private lendersFactoryService: LendersFactoryService,
    private rentersFactoryService: RenterFactoryService,
    private lendersRegistrationService: LendersRegistrationService,
    private rentersRegistrationService: RenterRegisterationService
  ) {
    this.serverApiService.getAllUsers().subscribe((data: {}) => {
      console.log(data);
      this.nodes = data;
      this.setPage(1);
    });
  }
  ngOnInit() {}
  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.nodes.length, page);
    // get current page of items
    this.pagedItems = this.nodes.slice(
      this.pager.startIndex,
      this.pager.endIndex + 1
    );
    this.pages = this.pager.pages;
  }
  ban(category, ethAddress, id) {
    if (category == 'renter') {
      console.log('renter');
      this.renterEthaddress = ethAddress;
      this.getRenterData();
      console.log(id);
      this.renterID = id;
    } else if (category == 'lender') {
      console.log('lender');
      this.lenderEthaddress = ethAddress;
      this.getLenderData();
      console.log(id);
      this.lenderID = id;
    }
  }
  async getRenterData() {
    this.accountContract = await this.rentersFactoryService.getRenterContract(
      this.renterEthaddress
    );
    if (this.accountContract != '0x0000000000000000000000000000000000000000') {
      await this.rentersRegistrationService.banAccount(this.accountContract);
      await this.serverApiService.ban(this.renterID);
    }
  }
  async getLenderData() {
    this.accountContract = await this.lendersFactoryService.getLenderContract(
      this.lenderEthaddress
    );
    if (this.accountContract != '0x0000000000000000000000000000000000000000') {
      await this.lendersRegistrationService.banAccount(this.accountContract);
      await this.serverApiService.ban(this.lenderID);
    }
  }
}
