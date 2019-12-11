import {Component, ElementRef, EventEmitter, Input, NgZone, OnInit, Output, ViewChild} from '@angular/core';
import {Step} from '../../../model/Step';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MapsAPILoader} from '@agm/core';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {TravelMode} from '../../../shared/common.types';

@Component({
  selector: 'app-tour-step',
  templateUrl: './tour-step.component.html',
  styleUrls: ['./tour-step.component.scss']
})
export class TourStepComponent implements OnInit {
  @Input() step: Step;
  @Input() stepLength: number;
  @Input() stepIndex: number;
  @Input() showValidation$: Observable<void>;
  @Output() stepRemoved = new EventEmitter<void>();

  form: FormGroup;
  @ViewChild("searchLocation", {static: false}) private locationRef: ElementRef;

  constructor(
    private fb: FormBuilder,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {
    this.form = this.fb.group({
      "location": [null, [Validators.required]],
      "description": [null, []]
    });
  }

  ngOnInit() {
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.locationRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          if (place.geometry === undefined || place.geometry === null)
            return;

          this.step.lng = place.geometry.location.lng();
          this.step.lat = place.geometry.location.lat();
        });
      });
    });

    // todo not to init this variable
    this.step.travelModeToNext = TravelMode.DRIVING;

    this.showValidation$
      .pipe(
        // Mark all controls as dirty
        tap(() => Object.keys(this.form.controls).forEach(key => this.form.controls[key].markAsDirty()))
      )
      .subscribe()
  }

  get f(): FormGroup{
    return this.form;
  }

  setStepDate(date: Date) {
    console.log(date);
    this.step.date = date;
  }

  public errorsOf(control: AbstractControl): Array<string> {
    const hasSomeError = control.invalid && (control.dirty || control.touched);
    return hasSomeError ? Object.keys(control.errors!) : [];
  }

  onStepRemoved() {
    this.stepRemoved.next();
  }

  notLast() {
    return this.stepIndex !== this.stepLength - 1;
  }

  updateRouteType($event) {
    this.step.travelModeToNext = $event.target.value as TravelMode;
  }

  setValue() {
    // todo to fix, does not set the value in select
    return this.step.travelModeToNext.toString()
  }
}
