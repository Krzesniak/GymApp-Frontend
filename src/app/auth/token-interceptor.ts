import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, take, switchMap } from 'rxjs/operators';
import {AuthService} from "../services/auth.service";
import {LoginResponse} from "./login/login-response";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private isRefreshing = false;
  isTokenRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(public authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.authService.getJwtToken()) {
      request = this.addToken(request, this.authService.getJwtToken());
    }

    // @ts-ignore
    return next.handle(request).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse && error.status === 403) {
        return this.handleAuthErrors(request, next);
      } else {
        return throwError(error);
      }
    }));
  }

  private addToken(request: HttpRequest<any>, token: string | null) {
    return request.clone({
      setHeaders: {
        'Authorization': `${token}`
      }
    });
  }

/*  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((token: any) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(token.jwt);
          return next.handle(this.addToken(request, token.jwt));
        }));

    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(jwt => {
          return next.handle(this.addToken(request, jwt));
        }));
    }
  }*/
  private handleAuthErrors(req: HttpRequest<any>, next: HttpHandler)
    : Observable<HttpEvent<any>> {
    if (!this.isTokenRefreshing) {
      this.isTokenRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((refreshTokenResponse: LoginResponse) => {
          this.isTokenRefreshing = false;
          this.refreshTokenSubject
            .next(refreshTokenResponse.accessToken);
          return next.handle(this.addToken(req,
            refreshTokenResponse.accessToken));
        })
      )
    } else {
      return this.refreshTokenSubject.pipe(
        filter(result => result !== null),
        take(1),
        switchMap((res) => {
          return next.handle(this.addToken(req,
            this.authService.getJwtToken()))
        })
      );
    }
  }
}
