import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as config from 'src/globalVars';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  public url = '/Location';

  constructor(
    public http: HttpClient,
  ) { }

  public getAllLocations (): Observable<any> {
    return this.http.get(`${config.api}${this.url}/getAll`);
  }
}
