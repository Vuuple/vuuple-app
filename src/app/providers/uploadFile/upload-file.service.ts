import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpEvent,
  HttpErrorResponse,
  HttpEventType
} from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
  SERVER_URL: string = 'http://localhost:3001/api/v1/swarm/';

  constructor(private httpClient: HttpClient) {}

  public upload(data, userId) {
    let uploadURL = `${this.SERVER_URL}/uploadraw`;
    console.log(data, 'data');

    return this.httpClient
      .post<any>(uploadURL, data, {
        reportProgress: true,
        observe: 'events'
      })
      .pipe(
        map(event => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
              const progress = Math.round((100 * event.loaded) / event.total);
              return { status: 'progress', message: progress };

            case HttpEventType.Response:
              return event.body;
            default:
              return `Unhandled event: ${event.type}`;
          }
        })
      );
  }
}
