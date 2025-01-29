import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginInfo, RegisterInfo } from '../shared/models/user.model';
import { environment } from 'src/environments/environment';
import { KEY } from '../shared/constants/key.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private http: HttpClient) { }

  register(registerInfo: RegisterInfo): Observable<any> {
    return this.http.post(environment.AUTH_API + 'register', registerInfo, this.httpOptions);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(environment.AUTH_API + 'login', {email, password}, this.httpOptions);
  }

  emailExists(email: string): Observable<any> {
    return this.http.post(environment.AUTH_API + 'email-exists', { email }, this.httpOptions);
  }

  isLoggedIn(): boolean {
    return !!window.sessionStorage.getItem(KEY.TOKEN);
  }
}
