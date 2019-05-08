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
    return this.dataService.postById('users/ban', id, '');
  }
  reject(id): Observable<any> {
    return this.dataService.postById('users/reject', id, '');
  }
  approve(id, data): Observable<any> {
    return this.dataService.postById('users/approve', id, data);
  }
  registerAdmin(data): Observable<any>{
    return this.dataService.post('users/admin',data) ;
  }
  // escrow route
  addEscrow(data): Observable<any> {
    return this.dataService.post('escrows', data);
  }
  getAllEscrows(): Observable<any[]> {
    return this.dataService.getList('escrows');
  }
  getEscrowsByUserId(id): Observable<any[]> {
    return this.dataService.getListWitFilter('escrows/user', id);
  }
}
