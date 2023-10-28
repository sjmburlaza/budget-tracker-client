import { Injectable } from '@angular/core';
import { KEY } from '../shared/constants/key.enum';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  saveToken(token: string): void {
    window.sessionStorage.removeItem(KEY.TOKEN);
    window.sessionStorage.setItem(KEY.TOKEN, token);
  }

  getToken(): string | null {
    return window.sessionStorage.getItem(KEY.TOKEN);
  }

  saveUser(user: any): void {
    window.sessionStorage.removeItem(KEY.USER);
    window.sessionStorage.setItem(KEY.USER, JSON.stringify(user));
  }

  getUser(): any {
    const user = window.sessionStorage.getItem(KEY.USER);
    return user ? JSON.parse(user) : {};
  }

  signOut(): void {
    window.sessionStorage.clear();
  }
}