import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(payload: any) {
    return this.http.get(`${environment.baseURL}/auth`, { params: payload });
  }

  signUp(payload: any) {
    return this.http.post(`${environment.baseURL}/auth`, payload);
  }

  saveToken(token: any) {
    localStorage.setItem('sc-token', token);
  }
  saveUserInfo(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUserId() {
    const userStr = localStorage.getItem('user');
    if (userStr != null) {
      return JSON.parse(userStr)?.id ?? 0;
    }
  }

  getUsername() {
    const userStr = localStorage.getItem('user');
    if (userStr != null) {
      return JSON.parse(userStr)?.username ?? null;
    }
  }

  hasToken() {
    if (this.getToken()) {
      return true;
    }
    return false;
  }

  getToken() {
    return localStorage.getItem('sc-token');
  }

  isLogin() {
    if (localStorage.getItem('sc-token') && localStorage.getItem('user')) {
      return true;
    }
    return false;
  }
}
