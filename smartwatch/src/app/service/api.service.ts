import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error.status == 401 || error.status == 403 || error.status == 404){
      throwError(error);
    }
    else if(!error.ok) {
      errMsg = 'Can\'t connect to server.';
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Promise.reject(errMsg);
  }

  fetchAllCountries(): Observable<any> {
    let urlString = environment.serverBaseUrl + 'country';
    // console.log('hello')

    return this.http.get(urlString, {})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  fetchAllRegions(): Observable<any> {
    let urlString = environment.serverBaseUrl + 'region';
    // console.log('hello')
    
    return this.http.get(urlString, {})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

}
