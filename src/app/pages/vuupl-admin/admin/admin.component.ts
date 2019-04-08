import { Component, OnInit } from '@angular/core';
import { ServerApiService } from '../../../providers/server-api/server-api.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  admins: any = [];

  constructor(private serverApiService: ServerApiService) {
    this.serverApiService.getAllAdmins().subscribe((data: {}) => {
      this.admins = data;
    });
  }

  ngOnInit() {}
}
