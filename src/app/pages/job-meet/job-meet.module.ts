import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../../shared/shared.module";
import {JobMeetComponent} from "./job-meet.component";
import {JobMeetRoutingModule} from "./job-meet-routing.module";



@NgModule({
  declarations: [
    JobMeetComponent
  ],
  imports: [
    CommonModule,
    JobMeetRoutingModule,
    SharedModule
  ]
})
export class JobMeetModule { }
