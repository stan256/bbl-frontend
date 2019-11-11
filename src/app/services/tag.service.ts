import {Injectable} from '@angular/core';
import {RestService} from './rest.service';
import {Tag, wrapTag} from '../shared/common.types';
import {delay} from 'rxjs/operators';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(
    private restService: RestService
  ) {}

  getTags(tagText: string): Observable<ReadonlyArray<Tag>> {
    // todo to use tag text
    // return this.restService.get<ReadonlyArray<Tag>>("localhost:9004/bbl-agent", {});

    return of([
      wrapTag('hiking'),
      wrapTag('skying'),
      wrapTag('chess')
    ]).pipe(
      delay(1000)
    );
  }
}
