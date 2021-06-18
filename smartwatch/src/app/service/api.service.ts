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

  sendEmail(data) {
    let urlString = environment.serverBaseUrl +'sendMail';

    return this.http.post(urlString, data, {observe: 'response'})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  fetchUserById(userId: String): Observable<any>{
    let urlString = environment.serverBaseUrl + 'user/' + userId;

    return this.http.get(urlString, {observe: 'response'})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  loginUser(data): Observable<any>{
    let urlString = environment.serverBaseUrl + 'login';

    return this.http.post(urlString, data, {observe: 'response'})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );    
  }

  logout() :void {    
    localStorage.setItem('isLoggedIn','false');    
    localStorage.removeItem('token');    
  }

  signupUser(data): Observable<any>{
    let urlString = environment.serverBaseUrl + 'register';

    return this.http.post(urlString, data, {observe: 'response'})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );    
  }

  updateProfile(userId: String , data): Observable<any> {
    let urlString = environment.serverBaseUrl + 'user/' + userId;

    return this.http.put(urlString, data, {observe: 'response'})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  
  forgotPassword(data): Observable<any> {
    let urlString = environment.serverBaseUrl + 'forgot';

    return this.http.post(urlString, data, {observe: 'response'})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  fetchAllCountries(): Observable<any> {
    let urlString = environment.serverBaseUrl + 'country';
    // console.log('hello')

    return this.http.get(urlString, {observe: 'response'})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  fetchCountryById(countryId: String): Observable<any> {
    let urlString = environment.serverBaseUrl + 'country/' + countryId;

    return this.http.get(urlString, {observe: 'response'})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  fetchPoPCountry(): Observable<any> {
    let urlString = environment.serverBaseUrl + 'pop-country';

    return this.http.get(urlString, {observe: 'response'})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  fetchCountryByName(searchValue: String): Observable<any> {
    let urlString = environment.serverBaseUrl + 'country/search';

    // console.log(searchValue);
    return this.http.post(urlString, searchValue , {observe: 'response'})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  addCountry(data): Observable<any> {

    let urlString = environment.serverBaseUrl + 'country';
    console.log(data);
    return this.http.post(urlString, data, {observe: 'response'})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  updateCountry(countryId: String , data): Observable<any> {
    let urlString = environment.serverBaseUrl + 'country/' + countryId;

    return this.http.put(urlString, data, {observe: 'response'})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  deleteCountry(countryId: String): Observable<any>{
    let urlString = environment.serverBaseUrl + 'country/' + countryId;
    console.log(urlString);

    return this.http.delete(urlString, {observe: 'response'})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  fetchAllRegions(): Observable<any> {
    let urlString = environment.serverBaseUrl + 'region';
    // console.log('hello')
    
    return this.http.get(urlString, {observe: 'response'})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  fetchRegionById(regionId: String): Observable<any> {
    let urlString = environment.serverBaseUrl + 'region/' + regionId;

    return this.http.get(urlString, {observe: 'response'})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  fetchRegionByCountryId(countryId: String): Observable<any> {
    let urlString = environment.serverBaseUrl + 'region/country/' + countryId;

    return this.http.get(urlString, {observe: 'response'})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }


  fetchRegionByName(regionName: String): Observable<any> {
    let urlString = environment.serverBaseUrl + 'region/search';

    return this.http.post(urlString, regionName , {observe: 'response'})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  addRegion(data: Object): Observable<any> {
    let urlString = environment.serverBaseUrl + 'region';
    console.log(data);
    return this.http.post(urlString, data, {observe: 'response'})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  updateRegion(regionId: String , data): Observable<any> {
    let urlString = environment.serverBaseUrl + 'region/' + regionId;
    console.log(data)
    return this.http.put(urlString, data, {observe: 'response'})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  deleteRegion(regionId: String): Observable<any>{
    let urlString = environment.serverBaseUrl + 'region/' + regionId;
    console.log(urlString);

    return this.http.delete(urlString, {observe: 'response'})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  fetchAllLocations(): Observable<any> {
    let urlString = environment.serverBaseUrl + 'location';
    // console.log('hello');

    return this.http.get(urlString, {observe: 'response'})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  fetchLocationById(locationId: String): Observable<any> {
    let urlString = environment.serverBaseUrl + 'location/' + locationId;

    return this.http.get(urlString, {observe: 'response'})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  fetchLocationByRegionId(regionId: String): Observable<any> {
    let urlString = environment.serverBaseUrl + 'location/region/' + regionId;

    return this.http.get(urlString, {observe: 'response'})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }


  fetchLocationByName(locationName: String): Observable<any> {
    let urlString = environment.serverBaseUrl + 'location/search';

    return this.http.post(urlString, locationName , {observe: 'response'})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  addLocation(data: Object): Observable<any> {
    let urlString = environment.serverBaseUrl + 'location';
    console.log(data);
    return this.http.post(urlString, data, {observe: 'response'})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  updateLocation(locationId: String , data): Observable<any> {
    let urlString = environment.serverBaseUrl + 'location/' + locationId;

    return this.http.put(urlString, data, {observe: 'response'})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  deleteLocation(locationId: String): Observable<any>{
    let urlString = environment.serverBaseUrl + 'location/' + locationId;
    console.log(urlString);

    return this.http.delete(urlString, {observe: 'response'})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  fetchAllClients(): Observable<any> {
    let urlString = environment.serverBaseUrl + 'client';

    return this.http.get(urlString, {observe: 'response'})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  fetchClientById(clientId: String): Observable<any> {
    let urlString = environment.serverBaseUrl + 'client/' + clientId;

    return this.http.get(urlString, {observe: 'response'})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  fetchClientByLocationId(locationId: String): Observable<any> {
    let urlString = environment.serverBaseUrl + 'client/location/' + locationId;

    return this.http.get(urlString, {observe: 'response'})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  fetchClientByName(clientName: String): Observable<any> {
    let urlString = environment.serverBaseUrl + 'client/search';

    return this.http.post(urlString, clientName , {observe: 'response'})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  addClient(data: Object): Observable<any> {
    let urlString = environment.serverBaseUrl + 'client';
    console.log(data);
    return this.http.post(urlString, data, {observe: 'response'})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  updateClient(clientId: String , data): Observable<any> {
    let urlString = environment.serverBaseUrl + 'client/' + clientId;

    return this.http.put(urlString, data, {observe: 'response'})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  deleteClient(clientId: String): Observable<any>{
    let urlString = environment.serverBaseUrl + 'client/' + clientId;
    console.log(urlString);

    return this.http.delete(urlString, {observe: 'response'})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  fetchAllDepartments(): Observable<any> {
    let urlString = environment.serverBaseUrl + 'department';

    return this.http.get(urlString, {observe: 'response'})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  fetchDepartmentById(departmentId: String): Observable<any> {
    let urlString = environment.serverBaseUrl + 'department/' + departmentId;

    return this.http.get(urlString, {observe: 'response'})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  fetchDepartmentByClientId(clientId: String): Observable<any> {
    let urlString = environment.serverBaseUrl + 'department/client/' + clientId;

    return this.http.get(urlString, {observe: 'response'})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }


  fetchDepartmentByName(departmentName: String): Observable<any> {
    let urlString = environment.serverBaseUrl + 'department/search';

    return this.http.post(urlString, departmentName , {observe: 'response'})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  addDepartment(data: Object): Observable<any> {
    let urlString = environment.serverBaseUrl + 'department';
    console.log(data);
    return this.http.post(urlString, data, {observe: 'response'})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  updateDepartment(departmentId: String , data): Observable<any> {
    let urlString = environment.serverBaseUrl + 'department/' + departmentId;

    return this.http.put(urlString, data, {observe: 'response'})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  deleteDepartment(departmentId: String): Observable<any>{
    let urlString = environment.serverBaseUrl + 'department/' + departmentId;
    console.log(urlString);

    return this.http.delete(urlString, {observe: 'response'})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  fetchAllScreens(): Observable<any> {
    let urlString = environment.serverBaseUrl + 'screen';

    return this.http.get(urlString, {observe: 'response'})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  fetchAllActiveScreens(): Observable<any> {
    let urlString = environment.serverBaseUrl + 'activescreen';

    return this.http.get(urlString, {observe: 'response'})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  fetchAllScreensPanel(): Observable<any> {
    let urlString = environment.serverBaseUrl + 'screenPanel';

    return this.http.get(urlString, {observe: 'response'})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  fetchScreensPanelByScreenId(screenId: String): Observable<any> {
    let urlString = environment.serverBaseUrl + 'screenPanel/' + screenId;

    return this.http.get(urlString, {observe: 'response'})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  fetchScreenById(screenId: String): Observable<any> {
    let urlString = environment.serverBaseUrl + 'screen/' + screenId;

    return this.http.get(urlString, {observe: 'response'})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  fetchScreenByDepartmentId(departmentId: String): Observable<any> {
    let urlString = environment.serverBaseUrl + 'screen/department/' + departmentId;

    return this.http.get(urlString, {observe: 'response'})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }


  fetchScreenByName(data: Object): Observable<any> {
    console.log(data)
    let urlString = environment.serverBaseUrl + 'screen/search';

    console.log(data)
    return this.http.post(urlString, data , {observe: 'response'})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  addScreen(data: Object): Observable<any> {
    let urlString = environment.serverBaseUrl + 'screen';
    // console.log(data);
    return this.http.post(urlString, data, {observe: 'response'})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  updateScreen(screenId: String , data): Observable<any> {
    let urlString = environment.serverBaseUrl + 'screen/' + screenId;

    return this.http.put(urlString, data, {observe: 'response'})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  deleteScreen(screenId: String): Observable<any>{
    let urlString = environment.serverBaseUrl + 'screen/' + screenId;
    console.log(urlString);

    return this.http.delete(urlString, {observe: 'response'})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  fetchPanelByScreen(screenId: String): Observable<any> {
    let urlString = environment.serverBaseUrl + 'panel/screen/' + screenId;

    return this.http.get(urlString, {observe: 'response'})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  fetchFalutyPanelByScreen(screenId: String, current_value): Observable<any> {
    let urlString = environment.serverBaseUrl + 'panel/screen/' + screenId;

    return this.http.post(urlString, current_value, {observe: 'response'})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  fetchActivePanelByScreen(screenId: String, current_value): Observable<any> {
    let urlString = environment.serverBaseUrl + 'panel/screen/' + screenId;

    return this.http.post(urlString, current_value, {observe: 'response'})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  fetchPanelById(panelId: String): Observable<any> {
    let urlString = environment.serverBaseUrl + 'panel/' + panelId;

    return this.http.get(urlString, {observe: 'response'})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  pairPanelWithSensor(panelId: String , data): Observable<any> {
    let urlString = environment.serverBaseUrl + 'panel/sensor/' + panelId ;

    return this.http.post(urlString, data, {observe: 'response'})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  generatePDF(msg: String) {
    let urlString = environment.serverBaseUrl + 'generateReport';

    return this.http.get(urlString , {observe: 'response'})
      .pipe(
          map(data => data),
          catchError(this.handleError)
      );
  }

  produceMessages(): Observable<any> {
    let urlString = environment.serverBaseUrl + 'producer';

    return this.http.get(urlString , {observe: 'response'})
      .pipe(
          map(data => data),
          catchError(this.handleError)
      );
  }

}
