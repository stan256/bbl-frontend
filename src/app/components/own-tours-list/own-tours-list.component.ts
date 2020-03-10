import { Component, OnInit } from '@angular/core';
import {TourService} from '../../services/tour.service';
import {Observable} from 'rxjs';
import {TourForm} from '../../model/tour';

@Component({
  selector: 'app-created-tours',
  templateUrl: './own-tours-list.component.html',
  styleUrls: ['./own-tours-list.component.scss']
})
export class OwnToursList implements OnInit {
  myTours$: Observable<Array<TourForm>>;

  constructor(
    private tourService: TourService
  ) { }

  ngOnInit() {
    // todo get userId from cookie
    let userId = 4;
    this.myTours$ = this.tourService.getOwnTours(userId);
  }

}
