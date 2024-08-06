import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AboutComponent} from "../about/about.component";
import {AboutRoutingModule} from "../about/about-routing.module";
import {SharedModule} from "../../shared/shared.module";
import {ContactRoutingModule} from "./contact-routing.module";
import {ContactComponent} from "./contact.component";



@NgModule({
  declarations: [
    ContactComponent
  ],
  imports: [
    CommonModule,
    ContactRoutingModule,
    SharedModule
  ]
})
export class ContactModule { }
