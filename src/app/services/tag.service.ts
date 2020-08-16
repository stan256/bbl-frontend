import {Injectable} from '@angular/core';
import {Tag, wrapTag} from '../shared/common.types';
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

  constructor() {
  }

  getTags(pattern: string): Observable<Array<Tag>> {
    // todo Real regex matching
    return of(this.tags);
  }

  createTag(tagText: string): Observable<Tag> {
    // todo Real add on backend...
    const tag = wrapTag(tagText);
    this.tags.push(tag);

    return of(tag);
  }
}
