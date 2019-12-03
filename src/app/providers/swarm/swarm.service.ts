import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class SwarmService {
  gateway = 'http://172.27.150.6:8500' || 'http://localhost:8500';

  private resolveSuffix = '?resolve=true';
  private actionUrl: string;

  constructor(private http: HttpClient) {
    // this.actionUrl = 'http://localhost:3001/api/v1/swarm/';
    this.actionUrl = 'http://localhost:3001/api/v1/erebos/';
    //this.actionUrl = 'http://18.221.44.174:3000';
    // this.actionUrl = 'http://localhost:3000/';
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
    console.log(body, 'body');

    const data = await this.post('uploadfilefrom', body).toPromise();
    return data.body;
  }

  // swarm route
  async swarmUploadraw(_file) {
    const body = {
      data: _file
    };
    console.log(body, 'body');

    const data = await this.post('uploadraw', body).toPromise();
    return data.body;
  }

  private post(ns: string, asset: any): Observable<any> {
    console.log(ns, 'ns');
    console.log(asset, 'asset');
    // const headers: HttpHeaders = new HttpHeaders()
    //   .set('Content-Type', 'application/x-www-formurlencoded')
    //   .set('Content-Type', 'application/octet-stream')
    //   .set('Content-Type', 'multipart/form-data');
    // headers.append('Content-any', 'application/json');

    // headers.append('Accept', 'application/json');
    return this.http
      .post(this.actionUrl + ns, asset /*, { headers: headers }*/)
      .pipe(map(this.extractData));
  }
  private extractData(res: Response): any {
    return res;
  }
}
