import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path : 'auth',
    loadChildren : () => import('src/app/modules/auth/auth.module').then(x => x.AuthModule)
  },
  {
    path: '',
    loadChildren : () => import('src/app/modules/vehicles/vehicles.module').then(x => x.VehiclesModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
