import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import {Alert, AlertError, AlertSuccess} from '../model/Alert';
import {delay} from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AlertService {
  private subject = new Subject<Alert>();
  private keepAfterNavigationChange = false;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterNavigationChange) {
          this.keepAfterNavigationChange = false;
        } else {
          this.subject.next();
        }
      }
    });
  }

  getAlert(): Observable<Alert> {
    return this.subject.asObservable();
  }

  success(message: string, keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next(new AlertSuccess(message));
  }

  error(message: string, keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next(new AlertError(message));
  }

  clear() {
    this.subject.next();
  }
}
