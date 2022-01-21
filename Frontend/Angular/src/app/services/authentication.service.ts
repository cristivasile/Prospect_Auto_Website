import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as config from 'src/globalVars';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public url = '/auth';

  constructor(
    public http: HttpClient,
  ) { }

  public getToken(loginDetails : any): Observable<any> {
    return this.http.post(`${config.api}${this.url}/login`, loginDetails);
  }

  public signUp(signupDetails : any): Observable<any> {
    return this.http.post(`${config.api}${this.url}/signUp`, signupDetails);
  }
}
