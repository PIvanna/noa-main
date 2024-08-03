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
import { AuthorizationComponent } from './authorization/authorization.component';
import { AdminComponent } from './admin/admin.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';
import { ProductComponent } from './product/product.component';
import { ProductInfoComponent } from './product/product-info/product-info.component';
import { ProductInfoResolver } from './shared/services/product/product-info.resolver';
import { CabinetComponent } from './cabinet/cabinet.component';
import { UserInfoComponent } from './cabinet/user-info/user-info.component';
import { HistoryOfOrderComponent } from './cabinet/history-of-order/history-of-order.component';
import { PasswordComponent } from './cabinet/password/password.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'delivery-payment', component: DeliveryPaymentComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'job', component: JobComponent },
  { path: 'job-meet', component: JobMeetComponent },
  { path: 'donatymo', component: DonatymoComponent },
  { path: 'oferta', component: OfertaComponent },
  { path: 'auth', component: AuthorizationComponent },
  {
    path: 'cabinet', component: CabinetComponent, children: [
      { path: 'user-info', component: UserInfoComponent },
      { path: 'history-order', component: HistoryOfOrderComponent },
      { path: 'password', component: PasswordComponent }
    ]
  },
  {
    path: 'admin', component: AdminComponent, children: [
      { path: 'category', component: AdminCategoryComponent },
      { path: 'product', component: AdminProductComponent }
    ]
  },
  {
    path: 'product/:category',
    component: ProductComponent
  },
  {
    path: 'product/:category/:id',
    component: ProductInfoComponent,
    resolve: {
      productInfo: ProductInfoResolver
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
