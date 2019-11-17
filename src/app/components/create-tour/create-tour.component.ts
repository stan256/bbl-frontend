import {Component, OnInit} from '@angular/core';
import {LocationService} from '../../services/location.service';

@Component({
  selector: 'app-create-tour',
  templateUrl: './create-tour.component.html',
  styleUrls: ['./create-tour.component.scss']
})
export class CreateTourComponent implements OnInit {
  userLng: number;
  userLat: number;

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
}
