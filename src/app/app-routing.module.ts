import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "@angular/fire/auth-guard";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./pages/about/about.module').then(m => m.AboutModule)
  },
  {
    path: 'delivery-payment',
    loadChildren: () => import('./pages/delivery-payment/delivery-payment.module').then(m => m.DeliveryPaymentModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./pages/contact/contact.module').then(m => m.ContactModule)
  },
  {
    path: 'job',
    loadChildren: () => import('./pages/job/job.module').then(m => m.JobModule)
  },
  {
    path: 'job-meet',
    loadChildren: () => import('./pages/job-meet/job-meet.module').then(m => m.JobMeetModule)
  },
  {
    path: 'donatymo',
    loadChildren: () => import('./pages/donatymo/donatymo.module').then(m => m.DonatymoModule)
  },
  {
    path: 'oferta',
    loadChildren: () => import('./pages/oferta/oferta.module').then(m => m.OfertaModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/authorization/authorization.module').then(m => m.AuthorizationModule)
  },
  {
    path: 'order',
    loadChildren: () => import('./pages/order/order.module').then(m => m.OrderModule)
  },
  {
    path: 'cabinet',
    canActivate: [AuthGuard],
    loadChildren: () => import('../app/pages/cabinet/cabinet.module').then(m => m.CabinetModule)
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'product/:category',
    loadChildren: () => import('../app/pages/product/product.module').then(m => m.ProductModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
