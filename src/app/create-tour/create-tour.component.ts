import { Component, OnInit } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {TourTag} from "../model/Tour";

@Component({
  selector: 'app-create-tour',
  templateUrl: './create-tour.component.html',
  styleUrls: ['./create-tour.component.scss']
})
export class CreateTourComponent implements OnInit {
  createTourForm: FormGroup;
  tourCharacters: Array<TourTag>;

  constructor() { }

  ngOnInit() {
  }

}
