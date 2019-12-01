import {Component, ElementRef, EventEmitter, Input, NgZone, OnInit, Output, ViewChild} from '@angular/core';
import {Step} from "../../../model/Step";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import { MapsAPILoader, MouseEvent } from '@agm/core';

@Component({
  selector: 'app-tour-step',
  templateUrl: './tour-step.component.html',
  styleUrls: ['./tour-step.component.scss']
})
export class TourStepComponent implements OnInit {
  @Input() step: Step;
  @Input() stepLength: number;
  @Output() stepRemoved = new EventEmitter<void>();

  showDescription: boolean = false;
  form: FormGroup;

  @ViewChild("search", {static: false}) private locationRef: ElementRef;

  constructor(
    private fb: FormBuilder,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {
    this.form = this.fb.group({
      "location": [null, [Validators.required]],
      "description": [null, [Validators.required]]
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

          this.step.place = place;
        });
      });
    });
  }

  get f(): FormGroup{
    return this.form;
  }

  changeShowDescription() {
    this.showDescription = !this.showDescription;
    this.f.get('description').setValue("");
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
}