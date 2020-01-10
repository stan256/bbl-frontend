import {Component, ElementRef, EventEmitter, Input, NgZone, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MapsAPILoader} from '@agm/core';
import {Observable, Subscription} from 'rxjs';
import {debounceTime, tap} from 'rxjs/operators';
import {StepForm} from '../../../model/step';

@Component({
  selector: 'app-tour-step',
  templateUrl: './tour-step.component.html',
  styleUrls: ['./tour-step.component.scss']
})
export class TourStepComponent implements OnInit, OnDestroy {
  @Input() step: StepForm;
  @Input() stepLength: number;
  @Input() stepIndex: number;
  @Input() parentForm: FormGroup;

  stepForm: FormGroup;
  showValidationSubscription: Subscription;

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

          // this.step.location = place.formatted_address;
          // this.step.locationLat = place.geometry.location.lat();
          // this.step.locationLng = place.geometry.location.lng();

          this.stepForm.get('location').setValue(place.formatted_address);
          this.stepForm.get('locationLat').setValue(place.geometry.location.lat());
          this.stepForm.get('locationLng').setValue(place.geometry.location.lng());
        });
      });
    });
  }

  ngOnDestroy(): void {
    this.showValidationSubscription.unsubscribe();
  }

  private addFormControls() {
    let controlSteps = this.parentForm.controls.steps as FormArray;
    this.stepForm = this.fb.group({
      "location": [null, [Validators.required]],
      "description": [null, []],
      "date": [null, [Validators.required]],
      "showRouteToNext": [null, []],
      "locationLat": [this.step.locationLat, []],
      "locationLng": [this.step.locationLng, []],
      "travelModeToNext": ['WALKING', [Validators.required]]
    });
    this.stepForm.valueChanges
      .pipe(
        debounceTime(100)
      )
      .subscribe(v => this.copyFormToStep(v));
    controlSteps.push(this.stepForm);
  }

  private copyFormToStep(formStep: StepForm) {
    Object.keys(formStep)
      .filter(key => key !== "location" && key !== "locationLat" && key !== "locationLng")
      .forEach(key => this.step[key] = formStep[key]);
    console.log(this.parentForm.value.steps[0])
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
