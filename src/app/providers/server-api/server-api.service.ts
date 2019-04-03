import { Injectable } from '@angular/core';
import { DataService } from '../http-provider/data.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServerApiService {
  constructor(private dataService: DataService) {}

  getAllUsers(): Observable<any[]> {
    return this.dataService.getList('api/users');
  }
  getUser(id): Observable<any> {
    return this.dataService.getSingle('api/profile', id);
  }
  approve(id, data): Observable<any> {
    return this.dataService.postById('api/approve', id, data);
  }
}
