import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  private resolveSuffix = '?resolve=true';
  private actionUrl: string;
  private headers: Headers;

  constructor(private http: HttpClient) {
    this.actionUrl = 'http://3.18.34.201:22000';
    //this.actionUrl = 'http://18.221.44.174:3000';
    // this.actionUrl = 'http://localhost:3000/';
    this.headers = new Headers();
    this.headers.append('Content-any', 'application/json');
    this.headers.append('Accept', 'application/json');
  }

  addRaftPeer(enode): Promise<any> {
    let data = {
      jsonrpc: '2.0',
      method: 'raft_addPeer',
      params: [enode],
      id: 1
    };
    console.log(data, 'data');
    return new Promise<any>((resolve, reject) => {
      this.post(data).subscribe(
        s => {
          resolve(s);
        },
        error => {
          reject(error);
        },
        // on complete
        () => resolve(true)
      );
    });
  }
  post(asset: any): Observable<any> {
    console.log('hit network');

    return this.http.post(this.actionUrl, asset).pipe(map(this.extractData));
  }
  private extractData(res: Response): any {
    return res;
  }
}
