import {Component, OnInit} from '@angular/core';
import {LocationService} from '../../services/location.service';
import {Step} from '../../model/Step';
import {Subject} from 'rxjs';
import {ModalService} from '../shared/modal-window/modal.service';
import {take, tap} from 'rxjs/operators';
import {TourService} from '../../services/tour.service';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RestrictionService} from '../../services/restriction.service';
import {TagService} from '../../services/tag.service';
import MarkFormDirtyUtils from '../../shared/utils/markFormDirty';


@Component({
  selector: 'app-create-tour',
  templateUrl: './create-tour.component.html',
  styleUrls: ['./create-tour.component.scss']
})
export class CreateTourComponent implements OnInit {
  userLng: number = 11.582579;
  userLat: number = 50.924845;

  steps: Array<Step> = [];
  peopleNumber: number = 5;
  form: FormGroup;

  tagsResults: string[];
  restrictionsResults: string[];

  removeStepConfirmation$ = new Subject<boolean>();
  showValidation$ = new Subject<void>();
  peopleNumber$ = new Subject<number>();

  constructor(
    private locationService: LocationService,
    private modalService: ModalService,
    private tourService: TourService,
    private tagService: TagService,
    private restrictionService: RestrictionService,
    private formBuilder: FormBuilder
  ) {}

  searchRestrictions(event) {
    this.restrictionService.getResults(event.query).then(data => {
      this.restrictionsResults = data;
    });
  }

  searchTags(event) {
    this.tagService.getTags(event.query).toPromise().then(data => {
      this.tagsResults = data;
    });
  }

  ngOnInit() {
    this.locationService.getPosition().subscribe(func => {
      func(g => {
        this.userLng = g.lng;
        this.userLat = g.lat;
        this.addStep();
      }, () => this.addStep())
    });

    this.peopleNumber$.next(5);

    this.form = this.formBuilder.group({
      peopleNumber: ['', Validators.required],
      tagsAutocomplete: ['', Validators.required],
      restrictionsAutocomplete: ['', Validators.required],
      steps: new FormArray([])
    });
  }

  get lastLng(): number {
    return this.steps.length != 0 ? this.steps[this.steps.length - 1].coordinates.lng : this.userLng;
  }

  get lastLat(): number {
    return this.steps.length != 0 ? this.steps[this.steps.length - 1].coordinates.lat : this.userLng;
  }

  private addStep() {
    if (!this.steps.length) {
      // setting the geo of user as first step
      this.steps.push(<Step> {
        coordinates: {lng: this.userLng, lat: this.userLat },
        travelModeToNext: "BICYCLING"
      });
    } else {
      let firstInvalidStepId: number = this.firstInvalidStep();

      if (firstInvalidStepId >= 0) {
        MarkFormDirtyUtils.markGroupDirty(this.form);
        document.getElementById("step-" + firstInvalidStepId).scrollIntoView();
      }  else {
        // creating a new step with geo location in the same place as previous
        const lastStep = this.steps[this.steps.length - 1];
        let step = <Step> {
          coordinates: { lat: lastStep.coordinates.lat, lng: lastStep.coordinates.lng },
          travelModeToNext: "BICYCLING"
        };
        this.steps.push(step);
      }
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
    step.coordinates = { lat: $event.coords.lat, lng: $event.coords.lng };
    this.locationService.geoCode(new google.maps.LatLng(step.coordinates.lat, step.coordinates.lng))
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

  iconUrl(step: Step) {
    if (this.steps.indexOf(step) === this.steps.length - 1){
      return "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";
    } else {
      return "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
    }
  }

  // check that step is not last & has initialized coordinates (but not same as origin) and showRouteToNext is true
  possibleToBuildRoute(stepIndex: number): boolean {
    return stepIndex != this.steps.length - 1 &&
      this.steps[stepIndex].showRouteToNext &&
      this.steps[stepIndex].coordinates.lat &&
      this.steps[stepIndex].coordinates.lng &&
      this.steps[stepIndex + 1].coordinates.lat !== this.steps[stepIndex].coordinates.lat &&
      this.steps[stepIndex + 1].coordinates.lng !== this.steps[stepIndex].coordinates.lng;
  }

  getTravelMode(i: number) {
    return this.steps[i].travelModeToNext.toString();
  }

  private firstInvalidStep(): number {
    let steps: any = this.form.controls.steps;
    return steps.controls.findIndex((step) => {
      return Object.keys(step.controls).some(c => {
        return step.controls[c].invalid
      });
    });
  }
}
