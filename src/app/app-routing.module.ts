import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { DeliveryPaymentComponent } from './delivery-payment/delivery-payment.component';
import { ContactComponent } from './contact/contact.component';
import { JobComponent } from './job/job.component';
import { JobMeetComponent } from './job-meet/job-meet.component';
import { DonatymoComponent } from './donatymo/donatymo.component';
import { OfertaComponent } from './oferta/oferta.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'delivery-payment', component: DeliveryPaymentComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'job', component: JobComponent},
  {path: 'job-meet', component: JobMeetComponent},
  {path: 'donatymo', component: DonatymoComponent},
  {path: 'oferta', component: OfertaComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
