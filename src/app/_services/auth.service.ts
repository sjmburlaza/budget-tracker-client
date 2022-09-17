import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:4000/api/user/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

// Authentication Service sends signup, login HTTPOST requests to backend
export class AuthService {
  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'login', {
      email,
      password
    }, httpOptions);
  }

  emailExists(email: string): Observable<any> {
    return this.http.post(AUTH_API + 'email-exists', {
      email
    }, httpOptions);
  }

  register(firstName: string, lastName: string, email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'register', {
      firstName,
      lastName,
      email,
      password
    }, httpOptions);
  }
}