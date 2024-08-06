import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {CabinetComponent} from "./cabinet.component";

const routes: Routes = [
  {
    path: '', component: CabinetComponent, children: [
      { path: 'user-info', loadChildren: () => import('./user-info/user-info.module').then(m => m.UserInfoModule) },
      { path: 'history-order', loadChildren: () => import('./history-of-order/history-of-order.module').then(m => m.HistoryOfOrderModule) },
      // { path: 'orders', component: AdminOrdersComponent },
      { path: 'password', loadChildren: () => import('./password/password.module').then(m => m.PasswordModule) },
      { path: '', pathMatch: 'prefix', redirectTo: 'user-info' }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CabinetRoutingModule { }
