import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import {getStorage, provideStorage} from "@angular/fire/storage";
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { DeliveryPaymentComponent } from './delivery-payment/delivery-payment.component';
import { ContactComponent } from './contact/contact.component';
import { JobComponent } from './job/job.component';
import { JobMeetComponent } from './job-meet/job-meet.component';
import { DonatymoComponent } from './donatymo/donatymo.component';
import { OfertaComponent } from './oferta/oferta.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    DeliveryPaymentComponent,
    ContactComponent,
    JobComponent,
    JobMeetComponent,
    DonatymoComponent,
    OfertaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage()),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
