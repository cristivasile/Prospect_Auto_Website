import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError} from 'rxjs/operators';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

@Injectable()
export class TokensenderInterceptor implements HttpInterceptor {

  constructor(
    private dataService : DataService,
    private router : Router,
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('Token');

    if (!token) {
      return next.handle(request);
    }

    const req1 = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token}`),
    });

    return next.handle(req1)
        .pipe(
          catchError((err, caught) => {
            if(err instanceof HttpErrorResponse  && err.status == 401){
              //stores username so it can be loaded on login form
              this.dataService.changeUserData(localStorage.getItem('Username'));
              //stores delog action so it can display the message on login page
              this.dataService.changeUserState(true);

              localStorage.setItem('Role', '');
              localStorage.setItem('Token', '');
              localStorage.setItem('Username', '');
              this.router.navigate(['/auth']);
            }
            return throwError(() => err);
          })
        )
  }
}
