import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main/main.component';
import { MaterialModule } from '../material/material.module';
import { VehiclesComponent } from './components/vehicles/vehicles/vehicles.component';
import { WheelsComponent } from './components/wheels/wheels/wheels.component';
import { LocationsComponent } from './components/locations/locations/locations.component';
import { AddVehicleComponent } from './components/vehicles/add-vehicle/add-vehicle.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddFeatureComponent } from './components/vehicles/add-feature/add-feature.component';
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
