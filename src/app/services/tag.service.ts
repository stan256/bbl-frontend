import {Injectable} from '@angular/core';
import {RestService} from './rest.service';
import {Tag, wrapTag} from '../shared/common.types';
import {delay} from 'rxjs/operators';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  tags: Array<Tag> = [
    wrapTag('hiking'),
    wrapTag('skying'),
    wrapTag('chess')
  ];

  constructor(
    private restService: RestService
  ) {}

  getTags(pattern: string): Observable<ReadonlyArray<Tag>> {
    // todo Real regex matching
    // return this.restService.get<ReadonlyArray<Tag>>("localhost:9004/bbl-agent", {});

    return of(this.tags).pipe(
      delay(200000)
    );
  }

  createTag(tagText: string): Observable<Tag> {
    // todo Real add on backend...
    const tag = wrapTag(tagText);
    this.tags.push(tag);

    return of(tag);
  }
}
