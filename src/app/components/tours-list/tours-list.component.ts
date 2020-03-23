import {Component, Input, OnInit} from '@angular/core';
import {StepForm} from "../../model/step";

@Component({
  selector: 'app-tours-list',
  templateUrl: './tours-list.component.html',
  styleUrls: ['./tours-list.component.scss']
})
export class ToursListComponent implements OnInit {

  @Input() tours$: StepForm[];

  constructor() { }

  ngOnInit() {
  }

}
