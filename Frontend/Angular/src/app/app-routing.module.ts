import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren : () => import('src/app/modules/vehicles/vehicles.module').then(x => x.VehiclesModule)
      }
    ]
  },
  {
    path : 'auth',
    loadChildren : () => import('src/app/modules/auth/auth.module').then(x => x.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
