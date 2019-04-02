/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class DataService {
  private resolveSuffix = '?resolve=true';
  private actionUrl: string;
  private headers: Headers;

  constructor(private http: HttpClient) {
    // this.actionUrl = 'http://18.223.208.148:3000/';
    this.actionUrl = 'http://localhost:3000/';
    this.headers = new Headers();
    this.headers.append('Content-any', 'application/json');
    this.headers.append('Accept', 'application/json');
  }

  public getList(ns: string): Observable<any[]> {
    console.log('GetAll ' + ns + ' to ' + this.actionUrl + ns);
    return this.http.get(`${this.actionUrl}${ns}`).pipe(map(this.extractData));
  }

  public getSingle(ns: string, id: string): Observable<any> {
    console.log('GetSingle ' + ns);

    return this.http
      .get(this.actionUrl + ns + '/' + id + this.resolveSuffix)
      .pipe(map(this.extractData));
  }

  public post(ns: string, asset: any): Observable<any> {
    return this.http
      .post(this.actionUrl + ns, asset)
      .pipe(map(this.extractData));
  }
  public postById(ns: string, id: any, asset: any): Observable<any> {
    return this.http
      .post(this.actionUrl + ns + '/' + id, asset)
      .pipe(map(this.extractData));
  }

  // public update(ns: string, id: string, itemToUpdate: any): Observable<any> {

  //   return this.http
  //     .put(`${this.actionUrl}${ns}/${id}`, itemToUpdate)
  //     .pipe(map(this.extractData));
  // }

  // public delete(ns: string, id: string): Observable<any> {
  //   console.log('Delete ' + ns);

  //   return this.http
  //     .delete(this.actionUrl + ns + '/' + id)
  //     .pipe(map(this.extractData));
  // }

  // private handleError(error: any): Observable<string> {
  //     // In a real world app, we might use a remote logging infrastructure
  //     // We'd also dig deeper into the error to get a better message
  //     const errMsg = (error.message) ? error.message :
  //       error.status ? `${error.status} - ${error.statusText}` : 'Server error';
  //     console.error(errMsg); // log to console instead
  //     return Observable.throw(errMsg);
  // }

  private extractData(res: Response): any {
    return res;
  }
}
