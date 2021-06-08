import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
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

  fetchUserById(userId: String): Observable<any>{
    let urlString = environment.serverBaseUrl + 'user/' + userId;

    return this.http.get(urlString, {})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  updateProfile(userId: String , data): Observable<any> {
    let urlString = environment.serverBaseUrl + 'user/' + userId;

    return this.http.put(urlString, data, {})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
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

  fetchPoPCountry(): Observable<any> {
    let urlString = environment.serverBaseUrl + 'pop-country';

    return this.http.get(urlString, {})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  fetchCountryByName(searchValue: String): Observable<any> {
    let urlString = environment.serverBaseUrl + 'country/search';

    // console.log(searchValue);
    return this.http.post(urlString, searchValue , {})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  addCountry(data): Observable<any> {

    let urlString = environment.serverBaseUrl + 'country';
    console.log(data);
    return this.http.post(urlString, data, {})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  updateCountry(countryId: String , data): Observable<any> {
    let urlString = environment.serverBaseUrl + 'country/' + countryId;

    return this.http.put(urlString, data, {})
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

  fetchRegionByCountryId(countryId: String): Observable<any> {
    let urlString = environment.serverBaseUrl + 'region/country/' + countryId;

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

  updateRegion(regionId: String , data): Observable<any> {
    let urlString = environment.serverBaseUrl + 'region/' + regionId;
    console.log(data)
    return this.http.put(urlString, data, {})
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

  fetchLocationByRegionId(regionId: String): Observable<any> {
    let urlString = environment.serverBaseUrl + 'location/region/' + regionId;

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

  updateLocation(locationId: String , data): Observable<any> {
    let urlString = environment.serverBaseUrl + 'location/' + locationId;

    return this.http.put(urlString, data, {})
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

  fetchClientByLocationId(locationId: String): Observable<any> {
    let urlString = environment.serverBaseUrl + 'client/location/' + locationId;

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

  updateClient(clientId: String , data): Observable<any> {
    let urlString = environment.serverBaseUrl + 'client/' + clientId;

    return this.http.put(urlString, data, {})
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

  fetchDepartmentByClientId(clientId: String): Observable<any> {
    let urlString = environment.serverBaseUrl + 'department/client/' + clientId;

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

  updateDepartment(departmentId: String , data): Observable<any> {
    let urlString = environment.serverBaseUrl + 'department/' + departmentId;

    return this.http.put(urlString, data, {})
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

  fetchAllScreensPanel(): Observable<any> {
    let urlString = environment.serverBaseUrl + 'screenPanel';

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

  fetchScreenByDepartmentId(departmentId: String): Observable<any> {
    let urlString = environment.serverBaseUrl + 'screen/department/' + departmentId;

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

  updateScreen(screenId: String , data): Observable<any> {
    let urlString = environment.serverBaseUrl + 'screen/' + screenId;

    return this.http.put(urlString, data, {})
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
    let urlString = environment.serverBaseUrl + 'panel/screen/' + screenId;

    return this.http.get(urlString, {})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  fetchPanelById(panelId: String): Observable<any> {
    let urlString = environment.serverBaseUrl + 'panel/' + panelId;

    return this.http.get(urlString, {})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  pairPanelWithSensor(panelId: String , sensorId: String): Observable<any> {
    let urlString = environment.serverBaseUrl + 'panel/' + panelId + '&sensorId=' + sensorId;

    return this.http.post(urlString, {})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }


}
