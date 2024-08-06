import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {DonatymoComponent} from "./donatymo.component";

const routes: Routes = [
  {
    path: '', component: DonatymoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DonatymoRoutingModule { }
