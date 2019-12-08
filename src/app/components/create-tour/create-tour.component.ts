import {Component, OnInit} from '@angular/core';
import {LocationService} from '../../services/location.service';
import {Tag} from '../../shared/common.types';
import {Step} from '../../model/Step';
import {Subject} from 'rxjs';
import {ModalService} from '../shared/modal-window/modal.service';
import {take, tap} from 'rxjs/operators';
import {TourService} from '../../services/tour.service';

@Component({
  selector: 'app-create-tour',
  templateUrl: './create-tour.component.html',
  styleUrls: ['./create-tour.component.scss']
})
export class CreateTourComponent implements OnInit {
  userLng: number = 11.582579;
  userLat: number = 50.924845;

  tags: ReadonlyArray<Tag>;
  steps: Array<Step> = [];
  removeStepConfirmation$ = new Subject<boolean>();
  showValidation$ = new Subject<void>();

  constructor(
    private locationService: LocationService,
    private modalService: ModalService,
    private tourService: TourService
  ) {}

  ngOnInit() {
    this.locationService.getPosition().subscribe(func => {
      func(g => {
        this.userLng = g.lng;
        this.userLat = g.lat;
        this.addStep();
      }, () => this.addStep())
    });

  }

  get lastLng(): number {
    return this.steps.length != 0 ? this.steps[this.steps.length - 1].lng : this.userLng;
  }

  get lastLat(): number {
    return this.steps.length != 0 ? this.steps[this.steps.length - 1].lat : this.userLng;
  }

  private addStep() {
    if (!this.steps.length) {
      // setting the geo of user for start
      this.steps.push(<Step> { lng: this.userLng, lat: this.userLat });
    } else {
      const lastStep = this.steps[this.steps.length - 1];
      if (lastStep.location)
        this.steps.push(<Step> {});
      else
        this.showValidation$.next();
    }
  }

  removeStep(i: number) {
    this.modalService.open("stepRemovePopup");
    this.removeStepConfirmation$.pipe(
      take(1),
      tap(confirmed => {
        this.closeModal();
        if (confirmed)
          this.steps.splice(i, 1);
      })
    ).subscribe();
  }

  confirmRemove() {
    this.removeStepConfirmation$.next(true);
  }

  closeModal() {
    this.removeStepConfirmation$.next(false);
    this.modalService.close('stepRemovePopup');
  }

  markerDragEnd($event: any, step: Step) {
    step.lat = $event.coords.lat;
    step.lng = $event.coords.lng;
    this.locationService.geoCode(new google.maps.LatLng(step.lat, step.lng))
      .pipe(
        take(1),
        tap(addresses => step.location = addresses[0].formatted_address)
      )
      .subscribe();
  }

  validData() {
    return this.steps.every(s => s.location);
  }

  createTour() {
    if (!this.validData())
      this.showValidation$.next();
    else
      this.tourService.createTour();
  }
}
