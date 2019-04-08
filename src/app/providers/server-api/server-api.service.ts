import { IUser } from './../../auth/core/user';
import { Injectable } from '@angular/core';
import { DataService } from '../http-provider/data.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServerApiService {
  constructor(private dataService: DataService) {}

  getAllRejectedUsers(): Observable<IUser[]> {
    return this.dataService.getList('users/rejected');
  }
  getAllRequests(): Observable<IUser[]> {
    return this.dataService.getList('users/requests');
  }
  getAllBannedUsers(): Observable<IUser[]> {
    return this.dataService.getList('users/banned');
  }
  getAllUsers(): Observable<IUser[]> {
    return this.dataService.getList('users');
  }
  getAllAdmins(): Observable<IUser[]> {
    return this.dataService.getList('users/admins');
  }
  getAllSupperAdmins(): Observable<IUser[]> {
    return this.dataService.getList('users/superAdmins');
  }
  getUsersByCategory(category): Observable<IUser[]> {
    return this.dataService.getListWitFilter('users/category', category);
  }
  getUser(id): Observable<IUser> {
    return this.dataService.getSingle('users', id);
  }
  ban(id): Observable<any> {
    return this.dataService.postById('users/approve', id, '');
  }
  reject(id): Observable<any> {
    return this.dataService.postById('users/approve', id, '');
  }
  approve(id, data): Observable<any> {
    return this.dataService.postById('users/approve', id, data);
  }

  // escrow route

  getAllEscrows(): Observable<any[]> {
    return this.dataService.getList('escrows');
  }
}
