import {Component, OnInit} from '@angular/core';
import {LocationService} from '../../services/location.service';
import {Tag} from '../../shared/common.types';
import {Step} from '../../model/Step';
import {Subject} from 'rxjs';
import {ModalService} from '../shared/modal-window/modal.service';
import {take, tap} from 'rxjs/operators';

@Component({
  selector: 'app-create-tour',
  templateUrl: './create-tour.component.html',
  styleUrls: ['./create-tour.component.scss']
})
export class CreateTourComponent implements OnInit {
  userLng: number;
  userLat: number;

  tags: ReadonlyArray<Tag>;
  steps: Array<Step> = [];

  removeStepConfirmation$ = new Subject<boolean>();

  constructor(
    private locationService: LocationService,
    private modalService: ModalService
  ) {}

  ngOnInit() {
    this.addStep();
    this.setDefaultLocation();
    this.locationService.getPosition().subscribe(func => {
      func(g => {
        console.log(g)

        this.userLng = g.lng;
        this.userLat = g.lat;
      })
    });

  }

  private addStep() {
    if (!this.steps.length) {
      this.steps.push(new Step());
    } else {
      const lastStep = this.steps[this.steps.length - 1];
      if (lastStep.title || lastStep.description)
        this.steps.push(new Step());
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

  private setDefaultLocation() {
    this.userLng = 42;
    this.userLat = 7;
  }


  // private setCurrentLocation() {
  //   if ('geolocation' in navigator) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       this.latitude = position.coords.latitude;
  //       this.longitude = position.coords.longitude;
  //       this.getAddress(this.latitude, this.longitude);
  //     });
  //   }
  // }
  //
  // markerDragEnd($event: MouseEvent) {
  //   // console.log($event);
  //   // this.latitude = $event.coords.lat;
  //   // this.longitude = $event.coords.lng;
  //   // this.getAddress(this.latitude, this.longitude);
  // }
  //
  // getAddress(latitude, longitude) {
  //   this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
  //     if (status === 'OK') {
  //       if (results[0]) {
  //         this.address = results[0].formatted_address;
  //         console.log(this.address)
  //       } else {
  //         window.alert('No results found');
  //       }
  //     } else {
  //       window.alert('Geocoder failed due to: ' + status);
  //     }
  //   });
  // }
}
