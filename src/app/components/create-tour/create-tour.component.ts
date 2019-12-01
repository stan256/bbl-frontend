import {Component, OnInit} from '@angular/core';
import {LocationService} from '../../services/location.service';
import {Tag} from '../../shared/common.types';
import {Step} from '../../model/Step';

@Component({
  selector: 'app-create-tour',
  templateUrl: './create-tour.component.html',
  styleUrls: ['./create-tour.component.scss']
})
export class CreateTourComponent implements OnInit {
  userLng: number;
  userLat: number;

  tags: ReadonlyArray<Tag>;
  steps: ReadonlyArray<Step>;

  constructor(
    private locationService: LocationService
  ) {
  }

  ngOnInit() {
    this.setDefaultLocation();
    this.locationService.getPosition().subscribe(this.setLocation());

  }

  private setLocation() {
    return v => v(position => {
      this.userLng = position.lng;
      this.userLat = position.lat;
    });
  }

  private setDefaultLocation() {
    this.userLng = 42;
    this.userLat = 7;
  }

  setTourTags(tags: ReadonlyArray<Tag>) {
    this.tags = tags;
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

  setSteps($event: ReadonlyArray<Step>) {
    this.steps = $event;
  }
}
