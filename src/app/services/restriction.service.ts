import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {RestService} from './rest.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestrictionService {

  constructor(
    private http: HttpClient
  ) { }

  getResults(query: string): Promise<Array<string>> {
    // return this.http
    //   .get('showcase/resources/data/countries.json')
    //   .toPromise()
    //   .then(o => <string[]> o);

    return of(["rain", "snow", "sun", "+40degree", "cold", "hot"]).toPromise();
  }
}
