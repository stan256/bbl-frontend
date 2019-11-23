import { Component, OnInit } from '@angular/core';
import {Step} from "../../model/Step";

@Component({
  selector: 'app-tour-steps',
  templateUrl: './tour-steps.component.html',
  styleUrls: ['./tour-steps.component.scss']
})
export class TourStepsComponent implements OnInit {
  value: Date;
  steps: Array<Step> = [];

  constructor() { }

  ngOnInit() {
    this.addStep()
  }

  private addStep() {
    if (!this.steps.length) {
      this.steps.push(new Step());
    } else {
      const lastStep = this.steps[this.steps.length - 1];
      if (lastStep.title || lastStep.description)
        this.steps.push(new Step());
    }
  }

  private removeStep(i: number) {
    this.steps.splice(i, 1);
  }
}
