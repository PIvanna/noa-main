import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../../../shared/shared.module";
import {UserInfoComponent} from "./user-info.component";
import {UserInfoRoutingModule} from "./user-info-routing.module";



@NgModule({
  declarations: [
    UserInfoComponent
  ],
  imports: [
    CommonModule,
    UserInfoRoutingModule,
    SharedModule
  ]
})
export class UserInfoModule { }
