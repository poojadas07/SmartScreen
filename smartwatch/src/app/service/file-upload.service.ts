import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
@Injectable({
providedIn: 'root'
})
export class FileUploadService {
	
// API url
baseApiUrl = "https://file.io"
	
constructor(private http:HttpClient) { }

upload(formData) {
  return this.http.post<any>(this.baseApiUrl, formData, {
 
    reportProgress: true,
    observe: 'events'
  });
  }
}
