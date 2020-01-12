import {Component, ElementRef, EventEmitter, Input, NgZone, OnInit, Output, ViewChild} from '@angular/core';
import {StepForm} from '../../../model/step';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MapsAPILoader} from '@agm/core';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-own-step',
  templateUrl: './own-step.component.html',
  styleUrls: ['./own-step.component.scss']
})
export class OwnStepComponent implements OnInit {
  @Input() step: StepForm;
  @Input() stepLength: number;
  @Input() stepIndex: number;
  @Input() parentForm: FormGroup;

  stepForm: FormGroup;

  @Output() stepRemoved = new EventEmitter<void>();

  @ViewChild("searchLocation", {static: false}) private locationRef: ElementRef;

  constructor(
    private fb: FormBuilder,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }

  ngOnInit() {
    this.addFormControls();

    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.locationRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          if (place.geometry === undefined || place.geometry === null)
            return;

          this.stepForm.get('location').setValue(place.formatted_address);
          this.stepForm.get('locationLat').setValue(place.geometry.location.lat());
          this.stepForm.get('locationLng').setValue(place.geometry.location.lng());
        });
      });
    });
  }

  private addFormControls() {
    this.stepForm = this.fb.group({
      "location": [this.step.location, [Validators.required]],
      "description": [this.step.description, []],
      "date": [this.step.date, [Validators.required]],
      "showRouteToNext": [this.step.showRouteToNext, []],
      "locationLat": [this.step.locationLat, []],
      "locationLng": [this.step.locationLng, []],
      "travelModeToNext": [this.step.travelModeToNext, [Validators.required]]
    });
    this.stepForm.valueChanges
      .pipe(debounceTime(100))
      .subscribe(v => this.copyFormToStep(v));

    (this.parentForm.controls.steps as FormArray).push(this.stepForm);
  }

  private copyFormToStep(formStep: StepForm) {
    Object.keys(formStep)
      .filter(key => key !== "location" && key !== "locationLat" && key !== "locationLng")
      .forEach(key => this.step[key] = formStep[key]);
  }

  get f(): FormGroup{
    return this.stepForm;
  }

  public errorsOf(control: AbstractControl): Array<string> {
    const hasSomeError = control.invalid && (control.dirty || control.touched);
    return hasSomeError ? Object.keys(control.errors) : [];
  }

  onStepRemoved() {
    this.stepRemoved.next();
  }

  notLast() {
    return this.stepIndex !== this.stepLength - 1;
  }
}
