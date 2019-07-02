import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class SwarmService {
  gateway = 'http://3.14.2.131:8500' || 'http://localhost:8500';

  private resolveSuffix = '?resolve=true';
  private actionUrl: string;
  private headers: Headers;

  constructor(private http: HttpClient) {
    this.actionUrl = 'http://localhost:3000/api/v1/erebos/';
    //this.actionUrl = 'http://18.221.44.174:3000';
    // this.actionUrl = 'http://localhost:3000/';
    this.headers = new Headers();
    this.headers.append('Content-any', 'application/json');
    this.headers.append('Accept', 'application/json');
  }

  async ping(gateway?, option?) {
    const body = { gateway: gateway ? gateway : this.gateway };
    const data = await this.post('ping', body).toPromise();
    return data.body;
  }
  async getUrl(_hash, gateway?, option?) {
    const body = {
      gateway: gateway ? gateway : this.gateway,
      hash: _hash,
      option: option ? option : 'raw'
    };
    const data = await this.post('getUrl', body).toPromise();
    return data.body;
  }
  async getContent(_hash, gateway?, option?) {
    const body = {
      gateway: gateway ? gateway : this.gateway,
      hash: _hash,
      option: option ? option : 'raw'
    };
    const data = await this.post('getContent', body).toPromise();
    return data.body;
  }
  async getManifest(_hash, gateway?, option?) {
    const body = {
      gateway: gateway ? gateway : this.gateway,
      hash: _hash,
      option: option ? option : 'raw'
    };
    const data = await this.post('list', body).toPromise();
    return data.body;
  }
  async downloaddirdata(_hash, gateway?, option?) {
    const body = {
      gateway: gateway ? gateway : this.gateway,
      hash: _hash,
      option: option ? option : 'raw'
    };
    const data = await this.post('downloaddirdata', body).toPromise();
    return data.body;
  }
  async downloadfileto(_hash, to, gateway?, option?) {
    const body = {
      gateway: gateway ? gateway : this.gateway,
      hash: _hash,
      targetpath: to,
      option: option ? option : 'raw'
    };
    const data = await this.post('downloadfileto', body).toPromise();
    return data.body;
  }
  async upload(_data, gateway?, option?) {
    const body = {
      gateway: gateway ? gateway : this.gateway,
      data: _data,
      option: option ? option : 'raw'
    };
    const data = await this.post('upload', body).toPromise();
    return data.body;
  }
  async uploadfile(_file, gateway?, option?) {
    const body = {
      gateway: gateway ? gateway : this.gateway,
      file: _file,
      option: option ? option : 'raw'
    };
    const data = await this.post('uploadfile', body).toPromise();
    return data.body;
  }
  async uploadFileFrom(_filePath, gateway?, option?) {
    const body = {
      gateway: gateway ? gateway : this.gateway,
      filepath: _filePath,
      option: option ? option : 'raw'
    };
    const data = await this.post('uploadfile', body).toPromise();
    return data.body;
  }

  private post(ns: string, asset: any): Observable<any> {
    return this.http
      .post(this.actionUrl + ns, asset)
      .pipe(map(this.extractData));
  }
  private extractData(res: Response): any {
    return res;
  }
}
