import { Injectable } from '@angular/core';
import {TourCreationDetails} from '../model/TourCreationDetails';
import {AlertService} from '../alert/alert.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TourService {

  constructor(private alertService: AlertService,
              private router: Router) { }

  createTour(formValue: TourCreationDetails) {
    this.alertService.success('You have created a tour');
    this.router.navigate(['/']);
  }
}
