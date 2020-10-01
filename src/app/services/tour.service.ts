import {Injectable} from '@angular/core';
import {AlertService} from '../alert/alert.service';
import {Router} from '@angular/router';
import {TourForm} from '../model/tour';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {TravelMode, wrapRestriction, wrapTag} from '../shared/common.types';

@Injectable({
  providedIn: 'root'
})
export class TourService {

  constructor(private alertService: AlertService,
              private httpClient: HttpClient,
              private router: Router) { }

  createTour(formValue: TourForm) {
    this.alertService.success('You have created a tour');
    console.log(formValue);
    this.router.navigate(['/']);
  }

  getOwnTours(userId: number): Observable<Array<TourForm>> {
    // todo
    // return this.httpClient.get<TourForm>("localhost:5200/api/my-tours", {});

    return of([{
      id: 1,
      tourName: "Magical Spain",
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
          locationLat: 48.15,
          locationLng: 11.33
        },
        {
          id: 12,
          location: "Wilhelmshof 14, 85764 Oberschleißheim, Germany",
          description: "Second step",
          date: new Date(222622222),
          showRouteToNext: false,
          travelModeToNext: "WALKING",
          locationLat: 48.24,
          locationLng: 11.55
        }
      ],
      creatorId: 3
    },{
      id: 1,
      tourName: "Magical Spain",
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
          locationLat: 48.15,
          locationLng: 11.33
        },
        {
          id: 12,
          location: "Wilhelmshof 14, 85764 Oberschleißheim, Germany",
          description: "Second step",
          date: new Date(222622222),
          showRouteToNext: false,
          travelModeToNext: "WALKING",
          locationLat: 48.24,
          locationLng: 11.55
        }
      ],
      creatorId: 3
    }, {
      id: 2,
      tourName: "Cold and beautiful bavarian Alps",
      peopleNumber: 5,
      tourTags: [wrapTag("hiking")],
      tourRestrictions: [wrapRestriction("rain")],
      steps: [
        {
          id: 12,
          location: "Wilh elmshof 14, 85764 Oberschleißheim, Germany",
          description: "First step",
          date: new Date(222222222),
          showRouteToNext: true,
          travelModeToNext: "WALKING",
          locationLat: 48.15,
          locationLng: 11.33
        }, {
          id: 12,
          location: "Wilhelmshof 14, 85764 Oberschleißheim, Germany",
          description: "Second step",
          date: new Date(222622222),
          showRouteToNext: false,
          travelModeToNext: "WALKING",
          locationLat: 48.24,
          locationLng: 11.55
        }
      ],
      creatorId: 3
    }]);
  }

  getTour(id: number): Observable<TourForm> {
    return of({
      id: 2,
      tourName: "Cold and beautiful bavarian Alps",
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
          locationLat: 48.24,
          locationLng: 11.55
        },
        {
          id: 12,
          location: "Wilhelmshof 14, 85764 Oberschleißheim, Germany",
          description: "Second step",
          date: new Date(222622222),
          showRouteToNext: false,
          travelModeToNext: "WALKING",
          locationLat: 48.24,
          locationLng: 11.55
        }
      ],
      creatorId: 3
    });
  }

  updateTour(tour: TourForm): boolean {
    this.alertService.success(`You succesfully updated the tour ${tour.tourName}`);
    this.router.navigate(['/']);
    return true;
  }

  searchTour(query: string): Observable<Array<TourForm>> {
    return of([{
      id: 1,
      tourName: "Magical Spain",
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
          locationLat: 48.15,
          locationLng: 11.33
        },
        {
          id: 12,
          location: "Wilhelmshof 14, 85764 Oberschleißheim, Germany",
          description: "Second step",
          date: new Date(222622222),
          showRouteToNext: false,
          travelModeToNext: "WALKING",
          locationLat: 48.24,
          locationLng: 11.55
        }
      ],
      creatorId: 3
    },{
      id: 1,
      tourName: "Magical Spain",
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
          locationLat: 48.15,
          locationLng: 11.33
        },
        {
          id: 12,
          location: "Wilhelmshof 14, 85764 Oberschleißheim, Germany",
          description: "Second step",
          date: new Date(222622222),
          showRouteToNext: false,
          travelModeToNext: "WALKING",
          locationLat: 48.24,
          locationLng: 11.55
        }
      ],
      creatorId: 3
    }, {
      id: 2,
      tourName: "Cold and beautiful bavarian Alps",
      peopleNumber: 5,
      tourTags: [wrapTag("hiking")],
      tourRestrictions: [wrapRestriction("rain")],
      steps: [
        {
          id: 12,
          location: "Wilh elmshof 14, 85764 Oberschleißheim, Germany",
          description: "First step",
          date: new Date(222222222),
          showRouteToNext: true,
          travelModeToNext: "WALKING",
          locationLat: 48.15,
          locationLng: 11.33
        }, {
          id: 12,
          location: "Wilhelmshof 14, 85764 Oberschleißheim, Germany",
          description: "Second step",
          date: new Date(222622222),
          showRouteToNext: false,
          travelModeToNext: "WALKING",
          locationLat: 48.24,
          locationLng: 11.55
        }
      ],
      creatorId: 3
    }]);
  }
}
