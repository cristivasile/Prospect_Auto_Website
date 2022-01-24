import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from 'src/app/admin.guard';
import { AddVehicleComponent } from './components/vehicles/add-vehicle/add-vehicle.component';
import { LocationsComponent } from './components/locations/locations/locations.component';
import { MainComponent } from './main/main.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { VehiclesComponent } from './components/vehicles/vehicles/vehicles.component';
import { WheelsComponent } from './components/wheels/wheels/wheels.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'main/vehicles'
  },
  {
    path: 'main',
    redirectTo: '/main/vehicles',
    pathMatch: 'full'
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
    },
    {
      path: 'notFound',
      component: NotFoundComponent
    },
    {
      path: 'vehicle',
      canActivate: [AdminGuard],
      children:[
        {
          path: 'add',
          component: AddVehicleComponent
        },
        //  path: 'edit/:id',
         // component: EditVehicleComponent
       // }
      ]
    }],
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
