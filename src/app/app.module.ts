import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AlertComponent} from './alert/alert.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {fakeBackendProvider} from './interceptor/FakeBackendInterceptor';
import {ErrorInterceptor} from './interceptor/ErrorInterceptor';
import {JwtInterceptor} from './interceptor/JwtInterceptor';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RegistrationComponent} from './components/registration/registration.component';
import {EntryComponent} from './components/entry/entry.component';
import {ModalWindowComponent} from './components/modal-window/modal-window.component';
import {FooterComponent} from './components/footer/footer.component';
import {HomeComponent} from './components/home/home.component';
import {LoginComponent} from './components/login/login.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import { DummyRowsComponent } from './components/dummy-rows/dummy-rows.component';
import {TagSelectComponent} from './components/tagselect/tag-select.component';
import {CreateTourComponent} from './components/create-tour/create-tour.component';
import { AgmCoreModule } from '@agm/core';
import { TourStepsComponent } from './components/tour-steps/tour-steps.component';
import { TourStepComponent } from './components/tour-steps/tour-step/tour-step.component';
import {CalendarModule} from 'primeng/calendar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { InputWithDescriptionComponent } from './components/shared/input-with-description/input-with-description.component';
import {TooltipModule} from 'primeng/primeng';
import {InputErrorDirective} from './directives/input-error.directive';

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
    TagSelectComponent,
    DummyRowsComponent,
    CreateTourComponent,
    TourStepsComponent,
    TourStepComponent,
    InputWithDescriptionComponent,
    InputErrorDirective
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDS6R0fyfgoBku5iI9IeA3sLuWrNRDD9XU'
    }),
    CalendarModule,
    FormsModule,
    BrowserAnimationsModule,
    TooltipModule
  ],
  exports: [
    InputErrorDirective
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
