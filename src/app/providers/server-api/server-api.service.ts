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
  getCount(): Observable<any> {
    return this.dataService.getSingle('users/count', '');
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
  registerAdmin(data): Observable<any> {
    return this.dataService.post('users/admin', data);
  }
  updateUserDate(data) : Observable<any> {
    return this.dataService.post('users/update' ,data);
  }
  updateImage(data) : Observable<any> {
    return this.dataService.post('users/updateImage' ,data);
  }
  // escrow route
  addEscrow(data): Observable<any> {
    return this.dataService.post('escrows', data);
  }
  getAllEscrows(): Observable<any[]> {
    return this.dataService.getList('escrows');
  }
  getStaticNodes(): Observable<any[]> {
    return this.dataService.getList('users/staticNodes');
  }
  getEscrowsByUserId(id): Observable<any[]> {
    return this.dataService.getListWitFilter('escrows/user', id);
  }
  getUsedSpace(): Observable<any> {
    return this.dataService.getSingle('escrows/usedSpace', '');
  }
  getFreeSpace(): Observable<any> {
    return this.dataService.getSingle('escrows/freeSpace', '');
  }
  getAllSpace(): Observable<any> {
    return this.dataService.getSingle('escrows/allSpace', '');
  }

  // token transaction
  getAllTokensTrans(): Observable<any[]> {
    return this.dataService.getList('tokens/all');
  }
  getAllTokensReq(): Observable<any[]> {
    return this.dataService.getList('tokens/');
  }
  getAllTokensUserTransaction(): Observable<any[]> {
    return this.dataService.getList('tokens/user');
  }
  getAllTokensApproved(): Observable<any[]> {
    return this.dataService.getList('tokens/approved');
  }
  getAllTokensRejected(): Observable<any[]> {
    return this.dataService.getList('tokens/rejected');
  }
  getAllTokensRedeem(): Observable<any[]> {
    return this.dataService.getList('tokens/redeem');
  }
  getAllTokensPurchase(): Observable<any[]> {
    return this.dataService.getList('tokens/purchase');
  }
  getTokenTransById(id): Observable<any> {
    return this.dataService.getSingle('tokens/', id);
  }

  purchase(data): Observable<any> {
    return this.dataService.post('tokens/purchase', data);
  }
  redeem(data): Observable<any> {
    return this.dataService.post('tokens/redeem', data);
  }
  managePurchase(id, data): Observable<any> {
    return this.dataService.postById('tokens/manage-purchase', id, data);
  }
  manageRedeem(id, data): Observable<any> {
    return this.dataService.postById('tokens/manage-redeem', id, data);
  }
 
  ///reset pass 
  checkEmail(data) : Observable<any> {
    return this.dataService.post( 'users/checkEmail' , data);
  }
  resetPassword(data) : Observable<any> {
    return this.dataService.post( 'users/restPassword' , data);
  }
  validateToken(data) : Observable<any> {
    return this.dataService.post( 'users/validateToken' , data);
  }
  setNewPassword(data) : Observable<any> {
    return this.dataService.post( 'users/setNewPassword' , data);
  }
}
