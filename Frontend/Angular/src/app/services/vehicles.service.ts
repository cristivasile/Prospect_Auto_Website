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

  public getVehicleById (id : string) : Observable<any> {
    return this.http.get(`${config.api}${this.url}/${id}`);
  }

  public deleteVehicle (id : string) : Observable<any> {
    return this.http.delete(`${config.api}${this.url}/${id}`);
  }

  public addVehicle (newVehicle: any) : Observable<any> {
    return this.http.post(`${config.api}${this.url}`, newVehicle);
  }

  public updateVehicle(updatedVehicle: any, id:string) : Observable<any> {
    console.log(updatedVehicle);
    return this.http.put(`${config.api}${this.url}/${id}`, updatedVehicle);
  }

}
