import {Component, ElementRef, EventEmitter, Input, NgZone, OnInit, Output, ViewChild} from '@angular/core';
import {Step} from '../../../model/Step';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
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

    let steps: any = this.parentForm.controls.steps;
    this.showValidation$
      .pipe(
        // Mark all controls as dirty when triggered
        tap(() => Object.keys(steps.controls).forEach(key => steps.controls[key].markAsDirty()))
      ).subscribe();

    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.locationRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          if (place.geometry === undefined || place.geometry === null)
            return;

          this.step.coordinates = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
          };
        });
      });
    });
  }


  private addFormControls() {
    let controlSteps = this.parentForm.controls.steps as FormArray;
    this.stepForm = this.fb.group({
      ["location"]:    [null, [Validators.required]],
      ["description"]: [null, []],
      ["calendar"]:    [null, [Validators.required]],
      ["showRouteToNext"]: [null, []],
      ["travelModeToNext"]: ['WALKING', [Validators.required]]
    });
    controlSteps.push(this.stepForm);
  }

  get f(): FormGroup{
    return this.stepForm;
  }

  setStepDate(date: Date) {
    this.step.date = date;
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
