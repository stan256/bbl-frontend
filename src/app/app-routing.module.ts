import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from './guard/auth.guard';
import {LoginComponent} from './components/login/login.component';
import {RegistrationComponent} from './components/registration/registration.component';
import {HomeComponent} from './components/home/home.component';
import {CreateTourComponent} from './components/create-tour/create-tour.component';
import {UserAccountComponent} from './components/user-account/user-account.component';
import {OwnTourComponent} from './components/own-tour/own-tour.component';
import {SearchTourComponent} from './components/search-tour/search-tour.component';


const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'create', component: CreateTourComponent},
  {path: 'user', component: UserAccountComponent},
  {path: 'search', component: SearchTourComponent},

  {path: 'owntours/edit/:id', component: OwnTourComponent},

  {path: '**', redirectTo: 'login'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
