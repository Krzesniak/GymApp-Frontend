import {Injectable} from '@angular/core';
import {LoginRequest} from "../auth/login/login-request";
import {LoginResponse} from "../auth/login/login-response";
import {HttpClient} from "@angular/common/http";
import {LocalStorageService} from 'ngx-webstorage';
import {Observable, of} from "rxjs";
import {catchError, mapTo, tap} from "rxjs/operators";
import {Token} from "../auth/token";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private loggedUser: string = "";

  constructor(private httpClient: HttpClient) {
  }

  login(user: LoginRequest): Observable<boolean> {
    return this.httpClient.post<any>("http://localhost:8080/login", user)
      .pipe(
        tap(tokens => this.doLoginUser(user.username, tokens)),
        mapTo(true),
        catchError(error => {
          alert(error.error);
          return of(false);
        }));
  }
  private doLoginUser(username: string, tokens: Token) {
    this.loggedUser = username;
    this.storeTokens(tokens);
  }

  private storeTokens(tokens: Token) {
    localStorage.setItem(this.JWT_TOKEN, tokens.accessToken);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }
  refreshToken() {
    return this.httpClient.post<any>("http://localhost:8080/refresh/token", {
      'refreshToken': this.getRefreshToken(),
      'username': this.loggedUser
    }).pipe(tap((tokens: Token) => {
      this.storeJwtToken(tokens.accessToken);
    }));
  }
  private getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }
  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }
}
