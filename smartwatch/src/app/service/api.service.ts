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

  fetchCountryById(countryId: String): Observable<any> {
    let urlString = environment.serverBaseUrl + 'country/' + countryId;

    return this.http.get(urlString, {})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  fetchCountryByName(countryName: String): Observable<any> {
    let urlString = environment.serverBaseUrl + 'country/search';

    return this.http.post(urlString, countryName , {})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  addCountry(data: Object): Observable<any> {
    let urlString = environment.serverBaseUrl + 'country';
    console.log(data);
    return this.http.post(urlString, data, {})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  updateCountry(countryId: String , countryName: String): Observable<any> {
    let urlString = environment.serverBaseUrl + 'country/' + countryId;

    return this.http.put(urlString, countryName, {})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  deleteCountry(countryId: String): Observable<any>{
    let urlString = environment.serverBaseUrl + 'country/' + countryId;
    console.log(urlString);

    return this.http.delete(urlString, {})
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

  fetchAllLocations(): Observable<any> {
    let urlString = environment.serverBaseUrl + 'location';
    // console.log('hello');

    return this.http.get(urlString, {})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  fetchAllClients(): Observable<any> {
    let urlString = environment.serverBaseUrl + 'client';

    return this.http.get(urlString, {})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  fetchAllDepartments(): Observable<any> {
    let urlString = environment.serverBaseUrl + 'department';

    return this.http.get(urlString, {})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  fetchAllScreens(): Observable<any> {
    let urlString = environment.serverBaseUrl + 'screen';

    return this.http.get(urlString, {})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  fetchPanelByScreen(screenId: String): Observable<any> {
    let urlString = environment.serverBaseUrl + 'screen/' + screenId;

    return this.http.get(urlString, {})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }



}
