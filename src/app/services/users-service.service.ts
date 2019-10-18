import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()

export class UsersServiceService {
  constructor(private http: HttpClient) { }

  private url = 'http://localhost:3000';

  // Opciones Http

  /*public getAll(): Observable<any> {
    return this.http.get('/api/users');
  }*/

  public getById(id: string): Observable<any> {
    return this.http.get(this.url + '/main/settings' + id);
  }

  public createUser(registerForm): Observable<any> {
    return this.http.post(this.url + '/auth/register-form', registerForm);
  }

  public updateUser(registerForm): Observable<any> {
    return this.http.put(this.url + '/main/settings' + registerForm.id, registerForm);
  }

  public delete(id: string): Observable<any> {
    return this.http.delete(this.url + '/main/settings' + id);
  }
}


