import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TourService} from '../../services/tour.service';
import {TourDTO} from '../../model/tour';
import {Observable} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {StepDTO, StepForm} from '../../model/step';
import MarkFormDirtyUtils from '../../shared/utils/markFormDirty';

@Component({
  selector: 'app-own-tour',
  templateUrl: './own-tour.component.html',
  styleUrls: ['./own-tour.component.scss']
})
export class OwnTourComponent implements OnInit {
  private tour$: Observable<TourDTO>;
  private form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private tourService: TourService,
    private formBuilder: FormBuilder
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
    })
  }

  // get lastLng(): number {
  //   return this.steps.length != 0 ? this.steps[this.steps.length - 1].locationLng : this.userLng;
  // }

  // get lastLat(): number {
  //   return this.steps.length != 0 ? this.steps[this.steps.length - 1].locationLat : this.userLng;
  // }

  private buildStepsFormGroups(steps: Array<StepDTO>) {
    return steps
      .map(step => {
        return this.formBuilder.group({
          "location": [step.location, [Validators.required]],
          "description": [step.description, []],
          "date": [step.date, [Validators.required]],
          "showRouteToNext": [step.showRouteToNext, []],
          "locationLat": [step.coordinates.lat, []],
          "locationLng": [step.coordinates.lng, []],
          "travelModeToNext": [step.travelModeToNext, [Validators.required]]
        });
      })
  }

  // private addStep() {
  //   if (!this.steps.length) {
  //     // setting the geo of user as first step
  //     this.steps.push(<StepForm> {
  //       locationLat: this.userLat,
  //       locationLng: this.userLng,
  //       travelModeToNext: "BICYCLING"
  //     });
  //   } else {
  //     let firstInvalidStepId: number = this.firstInvalidStep();
  //
  //     if (firstInvalidStepId >= 0) {
  //       MarkFormDirtyUtils.markGroupDirty(this.form);
  //       document.getElementById("step-" + firstInvalidStepId).scrollIntoView();
  //     }  else {
  //       // creating a new step with geo location in the same place as previous
  //       const lastStep = this.steps[this.steps.length - 1];
  //       let step = <StepForm> {
  //         locationLat: lastStep.locationLat,
  //         locationLng: lastStep.locationLng,
  //         travelModeToNext: "BICYCLING"
  //       };
  //       this.steps.push(step);
  //       this.changeDetector.detectChanges();
  //       document.getElementById("step-" + (this.steps.length - 1)).scrollIntoView();
  //     }
  //   }
  // }
}
