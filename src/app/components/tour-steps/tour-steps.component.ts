import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tour-steps',
  templateUrl: './tour-steps.component.html',
  styleUrls: ['./tour-steps.component.scss']
})
export class TourStepsComponent implements OnInit {
  value: Date;
  steps: Array<Step>;

  constructor() { }

  ngOnInit() {
  }

}

export class Step {

}
