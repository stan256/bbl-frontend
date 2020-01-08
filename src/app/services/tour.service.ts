import {Injectable} from '@angular/core';
import {AlertService} from '../alert/alert.service';
import {Router} from '@angular/router';
import {TourDTO, TourForm} from '../model/tour';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {wrapRestriction, wrapTag} from '../shared/common.types';

@Injectable({
  providedIn: 'root'
})
export class TourService {

  constructor(private alertService: AlertService,
              private httpClient: HttpClient,
              private router: Router) { }

  createTour(formValue: TourForm) {
    console.log(formValue)
    this.alertService.success('You have created a tour');
    this.router.navigate(['/']);
  }

  getMyTours(userId: number): Observable<Array<TourDTO>> {
    // todo
    // return this.httpClient.get<TourForm>("localhost:5200/api/my-tours", {});

    return of([{
      id: 1,
      peopleNumber: 5,
      tourTags: [wrapTag("hiking")],
      tourRestrictions: [wrapRestriction("rain")],
      steps: [
        {
          id: 12,
          location: "Wilhelmshof 14, 85764 Oberschleißheim, Germany",
          description: "First step",
          date: new Date(222222222),
          showRouteToNext: true,
          travelModeToNext: "WALKING",
          coordinates: { lat: 48.15, lng: 11.33}
        },
        {
          id: 12,
          location: "Wilhelmshof 14, 85764 Oberschleißheim, Germany",
          description: "Second step",
          date: new Date(222622222),
          showRouteToNext: false,
          travelModeToNext: "WALKING",
          coordinates: { lat: 48.24, lng: 11.55}
        }
      ]
    }, {
      id: 2,
      peopleNumber: 5,
      tourTags: [wrapTag("hiking")],
      tourRestrictions: [wrapRestriction("rain")],
      steps: [
        {
          id: 12,
          location: "Wilhelmshof 14, 85764 Oberschleißheim, Germany",
          description: "First step",
          date: new Date(222222222),
          showRouteToNext: true,
          travelModeToNext: "WALKING",
          coordinates: { lat: 48.15, lng: 11.33}
        },
        {
          id: 12,
          location: "Wilhelmshof 14, 85764 Oberschleißheim, Germany",
          description: "Second step",
          date: new Date(222622222),
          showRouteToNext: false,
          travelModeToNext: "WALKING",
          coordinates: { lat: 48.24, lng: 11.55}
        }
      ]
    }]);
  }
}
