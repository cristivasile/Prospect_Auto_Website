import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationsComponent } from './locations/locations.component';
import { MainComponent } from './main/main.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { WheelsComponent } from './wheels/wheels.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'main/vehicles'
  },
  {
    path:'main',
    component: MainComponent,
    children: [ {
      path:'vehicles',
      component: VehiclesComponent
    },{
      path: 'wheels',
      component: WheelsComponent,
    },{
      path: 'locations',
      component: LocationsComponent
    }]
  },
  {
    path:'test',
    component: VehiclesComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
