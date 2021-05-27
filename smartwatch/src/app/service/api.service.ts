import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Country } from './country';


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

  addCountry(data: Country): Observable<any> {

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

  fetchRegionById(regionId: String): Observable<any> {
    let urlString = environment.serverBaseUrl + 'region/' + regionId;

    return this.http.get(urlString, {})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }


  fetchRegionByName(regionName: String): Observable<any> {
    let urlString = environment.serverBaseUrl + 'region/search';

    return this.http.post(urlString, regionName , {})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  addRegion(data: Object): Observable<any> {
    let urlString = environment.serverBaseUrl + 'region';
    console.log(data);
    return this.http.post(urlString, data, {})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  updateRegion(regionId: String , regionName: String): Observable<any> {
    let urlString = environment.serverBaseUrl + 'region/' + regionId;

    return this.http.put(urlString, regionName, {})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  deleteRegion(regionId: String): Observable<any>{
    let urlString = environment.serverBaseUrl + 'region/' + regionId;
    console.log(urlString);

    return this.http.delete(urlString, {})
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

  fetchLocationById(locationId: String): Observable<any> {
    let urlString = environment.serverBaseUrl + 'location/' + locationId;

    return this.http.get(urlString, {})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }


  fetchLocationByName(locationName: String): Observable<any> {
    let urlString = environment.serverBaseUrl + 'location/search';

    return this.http.post(urlString, locationName , {})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  addLocation(data: Object): Observable<any> {
    let urlString = environment.serverBaseUrl + 'location';
    console.log(data);
    return this.http.post(urlString, data, {})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  updateLocation(locationId: String , locationName: String): Observable<any> {
    let urlString = environment.serverBaseUrl + 'location/' + locationId;

    return this.http.put(urlString, locationName, {})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  deleteLocation(locationId: String): Observable<any>{
    let urlString = environment.serverBaseUrl + 'location/' + locationId;
    console.log(urlString);

    return this.http.delete(urlString, {})
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

  fetchClientById(clientId: String): Observable<any> {
    let urlString = environment.serverBaseUrl + 'client/' + clientId;

    return this.http.get(urlString, {})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }


  fetchClientByName(clientName: String): Observable<any> {
    let urlString = environment.serverBaseUrl + 'client/search';

    return this.http.post(urlString, clientName , {})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  addClient(data: Object): Observable<any> {
    let urlString = environment.serverBaseUrl + 'client';
    console.log(data);
    return this.http.post(urlString, data, {})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  updateClient(clientId: String , clientName: String): Observable<any> {
    let urlString = environment.serverBaseUrl + 'client/' + clientId;

    return this.http.put(urlString, clientName, {})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  deleteClient(clientId: String): Observable<any>{
    let urlString = environment.serverBaseUrl + 'client/' + clientId;
    console.log(urlString);

    return this.http.delete(urlString, {})
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

  fetchDepartmentById(departmentId: String): Observable<any> {
    let urlString = environment.serverBaseUrl + 'department/' + departmentId;

    return this.http.get(urlString, {})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }


  fetchDepartmentByName(departmentName: String): Observable<any> {
    let urlString = environment.serverBaseUrl + 'department/search';

    return this.http.post(urlString, departmentName , {})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  addDepartment(data: Object): Observable<any> {
    let urlString = environment.serverBaseUrl + 'department';
    console.log(data);
    return this.http.post(urlString, data, {})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  updateDepartment(departmentId: String , departmentName: String): Observable<any> {
    let urlString = environment.serverBaseUrl + 'department/' + departmentId;

    return this.http.put(urlString, departmentName, {})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  deleteDepartment(departmentId: String): Observable<any>{
    let urlString = environment.serverBaseUrl + 'department/' + departmentId;
    console.log(urlString);

    return this.http.delete(urlString, {})
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

  fetchScreenById(screenId: String): Observable<any> {
    let urlString = environment.serverBaseUrl + 'screen/' + screenId;

    return this.http.get(urlString, {})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }


  fetchScreenByName(screenName: String): Observable<any> {
    let urlString = environment.serverBaseUrl + 'screen/search';

    return this.http.post(urlString, screenName , {})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  addScreen(data: Object): Observable<any> {
    let urlString = environment.serverBaseUrl + 'screen';
    console.log(data);
    return this.http.post(urlString, data, {})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  updateScreen(screenId: String , screenName: String): Observable<any> {
    let urlString = environment.serverBaseUrl + 'screen/' + screenId;

    return this.http.put(urlString, screenName, {})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  deleteScreen(screenId: String): Observable<any>{
    let urlString = environment.serverBaseUrl + 'screen/' + screenId;
    console.log(urlString);

    return this.http.delete(urlString, {})
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
