import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as config from 'src/globalVars';

@Injectable({
  providedIn: 'root'
})
export class FeaturesService {

  public url = '/Feature';

  constructor(
    public http: HttpClient,
  ) { }

  public getAllFeatures (): Observable<any> {
    return this.http.get(`${config.api}${this.url}/getAll`);
  }

  public addFeature (newFeature : any): Observable<any> {
    return this.http.post(`${config.api}${this.url}`, newFeature);
  }
}
