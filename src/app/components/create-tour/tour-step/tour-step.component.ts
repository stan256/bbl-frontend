import {Component, ElementRef, EventEmitter, Input, NgZone, OnInit, Output, QueryList, ViewChild} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {StepForm} from '../../../model/step';
import {dateValidator} from '../../../shared/validators/date-validator';
import {MapsAPILoader} from "@agm/core";

@Component({
  selector: 'app-tour-step',
  templateUrl: './tour-step.component.html',
  styleUrls: ['./tour-step.component.scss']
})
export class TourStepComponent implements OnInit {
  @Input() step: StepForm;
  @Input() stepIndex: number;
  @Input() parentForm: FormGroup;
  @Input() stepsRefs: QueryList<TourStepComponent>;

  stepForm: FormGroup;

  @Output() stepRemoved = new EventEmitter<void>();

  @ViewChild("searchLocation", {static: true}) private locationRef: ElementRef;

  constructor(
    private fb: FormBuilder,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
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
      })
    })
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
    this.setDateValidator();
    this.stepForm.valueChanges
      .pipe(debounceTime(100))
      .subscribe(v => this.copyFormToStep(v));
    (this.parentForm.controls.steps as FormArray).push(this.stepForm);
  }

  private setDateValidator() {
    this.f.get('date').valueChanges
      .pipe(distinctUntilChanged())
      .subscribe(value => {
        if (this.stepIndex !== 0) {
          let prevStep: TourStepComponent = this.stepsRefs.toArray()[this.stepIndex - 1];
          this.f.get('date').setValidators([Validators.required, dateValidator(prevStep.f.get('date').value, value)]);
        } else {
          this.f.get('date').setValidators([Validators.required]);
        }
        //ToDo date is not updated if previous one was changed
        this.stepsRefs.forEach((stepRef, index) => {
          stepRef.f.get('date').updateValueAndValidity();
        });
      })
  }

  private copyFormToStep(formStep: StepForm) {
    Object.keys(formStep)
      .filter(key => key !== "location" && key !== "locationLat" && key !== "locationLng")
      .forEach(key => this.step[key] = formStep[key]);
  }

  get f(): FormGroup {
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
    return this.stepIndex !== this.stepsRefs.length - 1;
  }
}
