import { Component, OnInit } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {TourForm} from "../../model/tour";
import {TourService} from "../../services/tour.service";
import {debounceTime, distinctUntilChanged, filter, switchMap} from "rxjs/operators";

@Component({
  selector: 'app-search-tour',
  templateUrl: './search-tour.component.html',
  styleUrls: ['./search-tour.component.scss']
})
export class SearchTourComponent implements OnInit {

  tours$ : Observable<TourForm[]>;
  private searchQuery$  = new Subject<string>();

  constructor(
    private tourService: TourService
  ) { }

  ngOnInit() {
    this.tours$ = this.searchQuery$.pipe(
      filter(query => query.length > 0),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((query : string) => this.tourService.searchTour(query))
    );
  }

  public search(query: string) {
    this.searchQuery$.next(query);
  }

}
