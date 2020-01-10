import { Component, OnInit } from '@angular/core';
import {TourService} from '../../services/tour.service';
import {Observable} from 'rxjs';
import {TourForm} from '../../model/tour';

@Component({
  selector: 'app-created-tours',
  templateUrl: './created-tours.component.html',
  styleUrls: ['./created-tours.component.scss']
})
export class CreatedToursComponent implements OnInit {
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
