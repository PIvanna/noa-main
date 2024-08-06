import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../../shared/shared.module";
import {DonatymoComponent} from "./donatymo.component";
import {DonatymoRoutingModule} from "./donatymo-routing.module";



@NgModule({
  declarations: [
    DonatymoComponent
  ],
  imports: [
    CommonModule,
    DonatymoRoutingModule,
    SharedModule
  ]
})
export class DonatymoModule { }
