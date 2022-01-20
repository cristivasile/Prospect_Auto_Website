import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main/main.component';
import { MaterialModule } from '../material/material.module';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { WheelsComponent } from './wheels/wheels.component';
import { LocationsComponent } from './locations/locations.component';

@NgModule({
  declarations: [
    MainComponent,
    VehiclesComponent,
    WheelsComponent,
    LocationsComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MaterialModule,
  ]
})
export class MainModule { }
