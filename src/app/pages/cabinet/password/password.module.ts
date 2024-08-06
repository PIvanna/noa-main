import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../../../shared/shared.module";
import {PasswordComponent} from "./password.component";
import {PasswordRoutingModule} from "./password-routing.module";



@NgModule({
  declarations: [
    PasswordComponent
  ],
  imports: [
    CommonModule,
    PasswordRoutingModule,
    SharedModule
  ]
})
export class PasswordModule { }
