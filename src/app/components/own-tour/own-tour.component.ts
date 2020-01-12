import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TourService} from '../../services/tour.service';
import {Observable, Subject} from 'rxjs';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import MarkFormDirtyUtils from '../../shared/utils/markFormDirty';
import {TourForm} from '../../model/tour';
import {StepForm} from '../../model/step';
import {LocationService} from '../../services/location.service';
import {take, tap} from 'rxjs/operators';
import {ModalService} from '../shared/modal-window/modal.service';
import {TagService} from '../../services/tag.service';
import {RestrictionService} from '../../services/restriction.service';

@Component({
  selector: 'app-own-tour',
  templateUrl: './own-tour.component.html',
  styleUrls: ['./own-tour.component.scss']
})
export class OwnTourComponent implements OnInit {
  userLng: number = 11.582579;
  userLat: number = 50.924845;

  private tour$: Observable<TourForm>;
  private form: FormGroup;
  private steps: Array<StepForm> = [];

  tagsResults: string[];
  restrictionsResults: string[];

  removeStepConfirmation$ = new Subject<boolean>();

  constructor(
    private locationService: LocationService,
    private route: ActivatedRoute,
    private tourService: TourService,
    private formBuilder: FormBuilder,
    private changeDetector: ChangeDetectorRef,
    private tagService: TagService,
    private restrictionService: RestrictionService,
    private modalService: ModalService
  ) { }

  ngOnInit() {
    // todo to fetch from cookies
    let id: number = 0;

    this.tour$ = this.tourService.getTour(id);
    this.tour$.subscribe(tour => {
      this.form = this.formBuilder.group({
        tourName: [tour.tourName, Validators.required],
        peopleNumber: [tour.peopleNumber, Validators.required],
        tourTags: [tour.tourTags, Validators.required],
        tourRestrictions: [tour.tourRestrictions, Validators.required],
        steps: new FormArray([])
      });
    });

    this.locationService.getPosition().subscribe(func => {
      func(g => {
        this.userLng = g.lng;
        this.userLat = g.lat;
      })
    });
  }

  get lastLng(): number {
    return this.steps.length != 0 ? this.steps[this.steps.length - 1].locationLng : this.userLng;
  }

  get lastLat(): number {
    return this.steps.length != 0 ? this.steps[this.steps.length - 1].locationLat : this.userLng;
  }

  private addStep() {
    if (!this.steps.length) {
      // setting the geo of user as first step
      this.steps.push(<StepForm> {
        locationLat: this.userLat,
        locationLng: this.userLng,
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
        let step = <StepForm> {
          locationLat: lastStep.locationLat,
          locationLng: lastStep.locationLng,
          travelModeToNext: "BICYCLING"
        };
        this.steps.push(step);
        this.changeDetector.detectChanges();
        document.getElementById("step-" + (this.steps.length - 1)).scrollIntoView();
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

  closeModal() {
    this.removeStepConfirmation$.next(false);
    this.modalService.close('stepRemovePopup');
  }

  iconUrl(step: StepForm) {
    if (this.steps.indexOf(step) === this.steps.length - 1){
      return "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";
    } else {
      return "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
    }
  }

  markerDragEnd($event: any, step: StepForm) {
    this.locationService.geoCode(new google.maps.LatLng($event.coords.lat, $event.coords.lng))
      .pipe(
        tap(addresses => {
          step.location = addresses[0].formatted_address;
          step.locationLat = addresses[0].geometry.location.lat();
          step.locationLng = addresses[0].geometry.location.lng();
        }),
        tap(() => this.changeDetector.detectChanges())
      )
      .subscribe();
  }

  // check that step is not last & has initialized coordinates (but not same as origin) and showRouteToNext is true
  possibleToBuildRoute(stepIndex: number): boolean {
    return stepIndex != this.steps.length - 1 &&
      this.steps[stepIndex].showRouteToNext &&
      this.steps[stepIndex].locationLat &&
      this.steps[stepIndex].locationLng &&
      this.steps[stepIndex + 1].locationLat !== this.steps[stepIndex].locationLat &&
      this.steps[stepIndex + 1].locationLng !== this.steps[stepIndex].locationLng;
  }

  getTravelMode(i: number) {
    return this.steps[i].travelModeToNext.toString();
  }

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

  private firstInvalidStep(): number {
    let steps: any = this.form.controls.steps;
    return steps.controls.findIndex((step) => {
      return Object.keys(step.controls).some(c => step.controls[c].invalid);
    });
  }


  confirmRemove() {
    this.removeStepConfirmation$.next(true);
  }

  updateTour() {
    if (this.form.invalid)
      MarkFormDirtyUtils.markGroupDirty(this.form);
    else
      this.tourService.updateTour(this.form.value as TourForm);
  }
}
