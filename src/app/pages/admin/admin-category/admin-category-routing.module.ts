import { NgModule } from '@angular/core';
import {AdminCategoryComponent} from "./admin-category.component";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {
    path: '', component: AdminCategoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdminCategoryRoutingModule { }
