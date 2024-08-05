import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
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
import { AuthdialogComponent } from './components/authdialog/authdialog.component';
import { CabinetComponent } from './cabinet/cabinet.component';
import { UserInfoComponent } from './cabinet/user-info/user-info.component';
import { HistoryOfOrderComponent } from './cabinet/history-of-order/history-of-order.component';
import { PasswordComponent } from './cabinet/password/password.component';
import { MenuComponent } from './components/menu/menu.component'; // Import MenuComponent

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { BasketComponent } from './components/basket/basket.component';
import { DeliveryComponent } from './components/delivery/delivery.component';
import { OrderComponent } from './order/order.component';

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
    AuthorizationComponent,
    AdminComponent,
    AdminCategoryComponent,
    AdminProductComponent,
    ProductComponent,
    ProductInfoComponent,
    AuthdialogComponent,
    CabinetComponent,
    UserInfoComponent,
    HistoryOfOrderComponent,
    PasswordComponent,
    MenuComponent,
    MainMenuComponent,
    BasketComponent,
    DeliveryComponent,
    OrderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage()),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule // Import MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
