import { NgModule } from '@angular/core';
import {AdminComponent} from "./admin.component";
import {RouterModule, Routes} from "@angular/router";
const routes: Routes = [
  {
    path: '', component: AdminComponent, children: [
      { path: 'product', loadChildren: () => import('./admin-product/admin-product.module').then(m => m.AdminProductModule) },
      // { path: 'orders', component: AdminOrdersComponent },
      { path: 'category', loadChildren: () => import('./admin-category/admin-category.module').then(m => m.AdminCategoryModule) },
      { path: '', pathMatch: 'prefix', redirectTo: 'discount' }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdminRoutingModule { }
