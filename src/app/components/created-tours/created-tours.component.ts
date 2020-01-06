import { Component, OnInit } from '@angular/core';
import {TourService} from '../../services/tour.service';
import {Observable} from 'rxjs';
import {TourDTO, TourForm} from '../../model/tour';

@Component({
  selector: 'app-created-tours',
  templateUrl: './created-tours.component.html',
  styleUrls: ['./created-tours.component.scss']
})
export class CreatedToursComponent implements OnInit {
  myTours$: Observable<TourDTO>;

  constructor(
    private tourService: TourService
  ) { }

  ngOnInit() {
    // todo get from cookie
    let userId = 4;
    this.myTours$ = this.tourService.getMyTours(userId);
  }a

}
