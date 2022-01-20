import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as config from 'src/globalVars';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

  public url = '/Vehicle';

  constructor(
    public http: HttpClient,
  ) { }

  public getAllAvailableVehicles (): Observable<any> {
    return this.http.get(`${config.api}${this.url}/getAvailable`);
  }

  public deleteVehicle (id : string) : Observable<any> {
    return this.http.delete(`${config.api}${this.url}/delete/${id}`);
  }
}
