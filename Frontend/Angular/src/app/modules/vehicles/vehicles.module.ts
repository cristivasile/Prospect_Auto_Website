import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehiclesRoutingModule } from './vehicles-routing.module';
import { VehicleComponent } from './vehicle/vehicle.component';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [
    VehicleComponent
  ],
  imports: [
    CommonModule,
    VehiclesRoutingModule,
    MaterialModule
  ]
})
export class VehiclesModule { }
