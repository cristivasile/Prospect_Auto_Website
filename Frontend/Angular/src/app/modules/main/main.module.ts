import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main/main.component';
import { MaterialModule } from '../material/material.module';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { WheelsComponent } from './wheels/wheels.component';
import { LocationsComponent } from './locations/locations.component';
import { AddVehicleComponent } from './add-vehicle/add-vehicle.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddFeatureComponent } from './add-feature/add-feature.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    MainComponent,
    VehiclesComponent,
    WheelsComponent,
    LocationsComponent,
    AddVehicleComponent,
    AddFeatureComponent,
    NotFoundComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class MainModule { }
