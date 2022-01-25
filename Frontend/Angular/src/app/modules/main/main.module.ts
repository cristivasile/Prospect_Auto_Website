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
import { EditVehicleComponent } from './components/vehicles/edit-vehicle/edit-vehicle.component';
import { DistancePipe } from 'src/app/pipes/distance.pipe';
import { EngineSizePipe } from 'src/app/pipes/engine-size.pipe';
import { PowerPipe } from 'src/app/pipes/power.pipe';
import { ViewVehicleComponent } from './components/vehicles/view-vehicle/view-vehicle.component';

@NgModule({
  declarations: [
    MainComponent,
    VehiclesComponent,
    WheelsComponent,
    LocationsComponent,
    AddVehicleComponent,
    AddFeatureComponent,
    NotFoundComponent,
    EditVehicleComponent,
    DistancePipe,
    EngineSizePipe,
    PowerPipe,
    ViewVehicleComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class MainModule { }
