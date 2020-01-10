import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TourService} from '../../services/tour.service';
import {Observable} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import MarkFormDirtyUtils from '../../shared/utils/markFormDirty';
import {TourForm} from '../../model/tour';
import {StepForm} from '../../model/step';
import {LocationService} from '../../services/location.service';

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
  private steps: Array<StepForm>;

  constructor(
    private locationService: LocationService,
    private route: ActivatedRoute,
    private tourService: TourService,
    private formBuilder: FormBuilder,
    private changeDetector: ChangeDetectorRef
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
        steps: this.buildStepsFormGroups(tour.steps)
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

  private buildStepsFormGroups(steps: Array<StepForm>) {
    return steps
      .map(step => {
        return this.formBuilder.group({
          "location": [step.location, [Validators.required]],
          "description": [step.description, []],
          "date": [step.date, [Validators.required]],
          "showRouteToNext": [step.showRouteToNext, []],
          "locationLat": [step.locationLat, []],
          "locationLng": [step.locationLng, []],
          "travelModeToNext": [step.travelModeToNext, [Validators.required]]
        });
      })
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

  private firstInvalidStep(): number {
    let steps: any = this.form.controls.steps;
    return steps.controls.findIndex((step) => {
      return Object.keys(step.controls).some(c => step.controls[c].invalid);
    });
  }
}
