import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient) { }
  private url = 'http://localhost:3000';

  public login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.url + '/auth/login-form', { email, password })
      .pipe(map(user => {
        if (user && user.token) { // acceso al usuario con una condicional con token
          localStorage.setItem('currentUser', JSON.stringify(user)); // mantener al usuario en acceso al refrescar la página
        }
        return user;
      }));
    }
  public logout() {
      // eliminar usuario tanto de local storage como hacer logout
      localStorage.removeItem('currentUser');
    }
  }
