import { Injectable, NgModule } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { VehicleFiltersModel } from '../interfaces/vehicle-filters-model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private vehiclesHasSearch: boolean = false;
  private vehiclesHasFilters: boolean = false;
  private vehiclesFilters: VehicleFiltersModel = {
    brand: '',
    maxMileage: 0,
    maxPrice: 0,
    minYear: 0,
    sort: '',
    sortAsc: false,
  };
  private vehiclesSearch: string = "";

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

  public changeUserState(state: any): void {
    this.userLoggedOut.next(state);
  }

  public patchState(hasSearch: boolean, hasFilter: boolean, filters: any, search: string): void {
    this.vehiclesHasSearch = hasSearch;
    this.vehiclesHasFilters = hasFilter;
    this.vehiclesFilters = {
    brand: filters.brand,
    maxMileage: filters.maxMileage,
    maxPrice: filters.maxPrice,
    minYear: filters.minYear,
    sort: filters.sort,
    sortAsc: filters.sortAsc,
    };
    this.vehiclesSearch = search;
  }

  public getHasSearch() : any{
    return this.vehiclesHasSearch;
  }

  public getHasFilters() : any{
    return this.vehiclesHasFilters;
  }

  public getFilters(): any{
    return this.vehiclesFilters;
  }

  public getSearch() : any{
    return this.vehiclesSearch;
  }

}
