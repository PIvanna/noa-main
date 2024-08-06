import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OfertaComponent} from "./oferta.component";
import {AboutRoutingModule} from "../about/about-routing.module";
import {SharedModule} from "../../shared/shared.module";
import {OfertaRoutingModule} from "./oferta-routing.module";



@NgModule({
  declarations: [
    OfertaComponent
  ],
  imports: [
    CommonModule,
    OfertaRoutingModule,
    SharedModule
  ]
})
export class OfertaModule { }
