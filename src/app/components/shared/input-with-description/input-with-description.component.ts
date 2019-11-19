import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-input-with-description',
  templateUrl: './input-with-description.component.html',
  styleUrls: ['./input-with-description.component.scss']
})
export class InputWithDescriptionComponent implements OnInit {
  @Input() mandatoryDescription: boolean = false;

  @Output() valueAndDescription = new EventEmitter<ValueAndDescription>();

  showDescription: boolean;
  value: string;
  description: string | null;

  constructor() {
    this.showDescription = this.mandatoryDescription;
  }

  ngOnInit() {
  }

  changeShowDescription() {
    this.showDescription = !this.showDescription;
  }

  emitValueAndDescription(){
    this.valueAndDescription.next(new ValueAndDescription(this.value, this.description));
  }

  textareaErrors(): ReadonlyArray<string> {
    const errors = [];
    if (!this.description && this.mandatoryDescription) errors.push("Please fill the description");
    return errors;
  }

  inputErrors(): ReadonlyArray<string> {
    if (!this.value)
      return ["Fill title!"]
  }
}

export class ValueAndDescription {
  constructor(value: string, description: string){}
}
