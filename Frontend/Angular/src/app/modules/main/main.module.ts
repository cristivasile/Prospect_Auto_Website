import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main/main.component';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { VehiclesComponent } from './vehicles/vehicles.component';


@NgModule({
  declarations: [
    MainComponent,
    VehiclesComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule
  ]
})
export class MainModule { }
