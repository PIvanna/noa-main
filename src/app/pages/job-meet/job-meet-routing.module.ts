import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {JobMeetComponent} from "./job-meet.component";

const routes: Routes = [
  {
    path: '', component: JobMeetComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class JobMeetRoutingModule { }
