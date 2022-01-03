import {Injectable} from '@angular/core';
import {LoginRequest} from "../auth/login/login-request";
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {catchError, mapTo, tap} from "rxjs/operators";
import {Token} from "../auth/token";
import {PrivateInformation, Registration} from "../auth/registration/registration.component";
import jwtDecode from "jwt-decode";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private loggedUser: string = "";
  role: string = "ROLE_USER";

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  registerAvatar(data: any) {
    return this.httpClient.post("http://localhost:8080/avatar", data);
  }

  login(user: LoginRequest): Observable<boolean> {
    return this.httpClient.post<any>("http://localhost:8080/login", user)
      .pipe(
        tap(tokens => this.doLoginUser(user.username, tokens)),
        mapTo(true));
  }

  logoout() {
    return this.httpClient.delete("http://localhost:8080/logout/" + this.getRefreshToken()).subscribe( data => {
      localStorage.clear();
      this.router.navigate(['home'])
    })
  }
  private doLoginUser(username: string, tokens: Token) {
    this.loggedUser = username;
    this.makePermission(tokens.accessToken);
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
    return this.getJwtToken() != null;
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

  registerUser(register: Registration) {
    return this.httpClient.post("http://localhost:8080/register", register);
  }

  verifyUser(token: any) {
    return this.httpClient.get(`http://localhost:8080/accountVerification/${token}`);
  }

  getUserInfo() {
    return this.httpClient.get<PrivateInformation>(`http://localhost:8080/user-info`);

  }

  private makePermission(accessToken: string) {
    let decodedToken: any = jwtDecode(accessToken);
    this.role = decodedToken.authorities[0].authority;
  }
  public getRole(){
    return this.role;
  }

  getImage() {
    return this.httpClient.get<any>('http://localhost:8080/avatar');
  }
}
