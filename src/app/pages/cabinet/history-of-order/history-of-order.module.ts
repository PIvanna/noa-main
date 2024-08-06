import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../../../shared/shared.module";
import {HistoryOfOrderComponent} from "./history-of-order.component";
import {HistoryOfOrderRoutingModule} from "./history-of-order-routing.module";



@NgModule({
  declarations: [
    HistoryOfOrderComponent
  ],
  imports: [
    CommonModule,
    HistoryOfOrderRoutingModule,
    SharedModule
  ]
})
export class HistoryOfOrderModule { }
