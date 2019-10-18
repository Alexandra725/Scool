import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesServicesService {

  constructor( private http: HttpClient ) { }

  private url = 'http://localhost:3000';

    public getCourses():Observable<any> {
      return this.http.get(this.url + '/main/courses')
    }

    getCourse(userId):Observable<any>{
      return this.http.get(this.url+ '/main/courses/'+ userId);
    }


}
