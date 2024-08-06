import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminProductComponent} from "./admin-product.component";
import {AdminProductRoutingModule} from "./admin-product-routing.module";
import {SharedModule} from "../../../shared/shared.module";



@NgModule({
  declarations: [
    AdminProductComponent
  ],
  imports: [
    CommonModule,
    AdminProductRoutingModule,
    SharedModule
  ]
})
export class AdminProductModule { }