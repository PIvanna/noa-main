import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminCategoryComponent} from "./admin-category.component";
import {AdminCategoryRoutingModule} from "./admin-category-routing.module";
import {SharedModule} from "../../../shared/shared.module";



@NgModule({
  declarations: [
    AdminCategoryComponent
  ],
  imports: [
    CommonModule,
    AdminCategoryRoutingModule,
    SharedModule
  ]
})
export class AdminCategoryModule { }
