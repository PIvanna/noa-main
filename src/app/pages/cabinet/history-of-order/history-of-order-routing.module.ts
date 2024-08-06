import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HistoryOfOrderComponent} from "./history-of-order.component";

const routes: Routes = [
  {
    path: '', component: HistoryOfOrderComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class HistoryOfOrderRoutingModule { }
