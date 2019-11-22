import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-input-with-description',
  templateUrl: './input-with-description.component.html',
  styleUrls: ['./input-with-description.component.scss']
})
export class InputWithDescriptionComponent implements OnInit {
  @Input() valueTitle: string | null = "Value";
  @Input() descriptionTitle: string | null = "Description";
  @Input() mandatoryDescription: boolean = false;

  @Output() valueAndDescription = new EventEmitter<ValueAndDescription>();

  showDescription: boolean;

  form: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
    this.showDescription = this.mandatoryDescription;
    this.form = this.fb.group({
      "value": [null, [Validators.required]],
      "description": [null, [Validators.required]]
    });
  }

  ngOnInit() {
  }

  get f(): FormGroup{
    return this.form;
  }

  changeShowDescription() {
    this.showDescription = !this.showDescription;
    this.f.get('description').setValue("");
  }

  emitValueAndDescription(){

  }

  public errorsOf(control: AbstractControl): Array<string> {
    const hasSomeError = control.invalid && (control.dirty || control.touched);
    return hasSomeError ? Object.keys(control.errors!) : [];
  }
}

export class ValueAndDescription {
  constructor(value: string, description: string){}
}
