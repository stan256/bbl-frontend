import { Component, OnInit } from '@angular/core';

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
    this.addStep();
  }


  private addStep() {
    if (!this.steps.length){
      this.steps.push(new Step());
    } else if (this.steps.pop().title || this.steps.pop().description ) {
      this.steps.push(new Step());
    }
  }

  setDateTime(step: Step, $event: any) {
    console.log(step)

  }
}

export class Step {
  title: string | null;
  description: string | null;
  date: Date | null;
}
