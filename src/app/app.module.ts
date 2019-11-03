import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {NavbarComponent} from './navbar/navbar.component';
import {FooterComponent} from './footer/footer.component';
import {ModalWindowComponent} from './modal-window/modal-window.component';
import {EntryComponent} from './entry/entry.component';
import {AlertComponent} from './alert/alert.component';
import {HomeComponent} from './home/home.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {fakeBackendProvider} from './interceptor/FakeBackendInterceptor';
import {ErrorInterceptor} from './interceptor/ErrorInterceptor';
import {JwtInterceptor} from './interceptor/JwtInterceptor';
import {RegistrationComponent} from './registration/registration.component';
import {ReactiveFormsModule} from '@angular/forms';
import { CreateTourComponent } from './create-tour/create-tour.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    NavbarComponent,
    FooterComponent,
    ModalWindowComponent,
    EntryComponent,
    AlertComponent,
    HomeComponent,
    CreateTourComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
