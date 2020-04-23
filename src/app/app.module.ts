import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { GoogleMapsModule } from "@angular/google-maps";

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
import {FooterComponent} from './components/footer/footer.component';
import {HomeComponent} from './components/home/home.component';
import {LoginComponent} from './components/login/login.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import { DummyRowsComponent } from './components/dummy-rows/dummy-rows.component';
import {TagSelectComponent} from './components/tagselect/tag-select.component';
import {CreateTourComponent} from './components/create-tour/create-tour.component';
import { AgmCoreModule } from '@agm/core';
import {CalendarModule} from 'primeng/calendar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AutoCompleteModule, CarouselModule, SliderModule, SpinnerModule, TabViewModule, TooltipModule} from 'primeng/primeng';
import {TourStepComponent} from './components/create-tour/tour-step/tour-step.component';
import { OnlyNumberDirective } from './shared/only-number.directive';
import {AgmDirectionModule} from 'agm-direction';
import {DragAndDropFilesDirective} from './shared/drag-and-drop-files.directive';
import { ImageDragUploadComponent } from './components/shared/file-drag-upload/image-drag-upload.component';
import { OwnToursList } from './components/own-tours-list/own-tours-list.component';
import { UserAccountComponent } from './components/user-account/user-account.component';
import { OwnTourComponent } from './components/own-tour/own-tour.component';
import { OwnStepComponent } from './components/own-tour/own-step/own-step.component';
import { SearchTourComponent } from './components/search-tour/search-tour.component';
import {ModalWindowComponent} from './components/shared/modal-window/modal-window.component';
import { ToursListComponent } from './components/tours-list/tours-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    NavbarComponent,
    FooterComponent,
    ModalWindowComponent,
    SearchTourComponent,
    EntryComponent,
    AlertComponent,
    HomeComponent,
    TagSelectComponent,
    DummyRowsComponent,
    CreateTourComponent,
    TourStepComponent,
    OnlyNumberDirective,
    DragAndDropFilesDirective,
    ImageDragUploadComponent,
    OwnToursList,
    UserAccountComponent,
    OwnTourComponent,
    OwnStepComponent,
    ToursListComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDS6R0fyfgoBku5iI9IeA3sLuWrNRDD9XU',
      libraries: ['places']
    }),
    GoogleMapsModule,
    AgmDirectionModule,
    CalendarModule,
    FormsModule,
    BrowserAnimationsModule,
    TooltipModule,
    CarouselModule,
    SliderModule,
    SpinnerModule,
    AutoCompleteModule,
    TabViewModule
  ],
  exports: [
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
