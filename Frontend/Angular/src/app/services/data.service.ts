import { Injectable, NgModule } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private userSource = new BehaviorSubject({
    username: '',
  });
  public currentUser = this.userSource.asObservable();

  private userLoggedOut = new BehaviorSubject(false);
  public userState = this.userLoggedOut.asObservable();

  constructor() {
  }

  public changeUserData(user : any): void {
    this.userSource.next(user);
  }

  public changeUserState(state: any): void{
    this.userLoggedOut.next(state);
  }

}
