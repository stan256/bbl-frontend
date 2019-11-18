import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-input-with-description',
  templateUrl: './input-with-description.component.html',
  styleUrls: ['./input-with-description.component.scss']
})
export class InputWithDescriptionComponent implements OnInit {
  @Input() mandatoryDescription: boolean = false;

  showDescription: boolean;
  value: string;
  description: string | null;

  constructor() {
    this.showDescription = false;
  }

  ngOnInit() {
  }

  changeShowDescription() {
    this.showDescription = !this.showDescription;
  }
}
