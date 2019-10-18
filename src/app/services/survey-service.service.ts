import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class SurveyServiceService {

  private courseSource = new BehaviorSubject('inicio');
  courseVaue =  this.courseSource.asObservable();
  constructor(private http: HttpClient) {}

  private url = 'http://localhost:3000';

   surveyResult(id: string, question: string ): Observable<any> {
    return this.http.put<any>(this.url + '/survey/' + id, {surveyResult : question});
  }
  
  courseUpdate(data){
    this.courseSource.next(data);
  }

}
