import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {AlertService} from './alert.service';
import {Alert} from '../model/Alert';
import {debounceTime, delay, take, takeLast, tap} from 'rxjs/operators';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  alert: Alert = null;

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.subscription = this.alertService.getAlert().pipe(
      tap((x: Alert) => this.alert = x),
      debounceTime(5000),
      tap(x => this.alert = null)
    ).subscribe();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
