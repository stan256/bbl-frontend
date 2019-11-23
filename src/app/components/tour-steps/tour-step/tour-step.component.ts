import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Step} from "../../../model/Step";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ModalService} from "../../shared/modal-window/modal.service";

@Component({
  selector: 'app-tour-step',
  templateUrl: './tour-step.component.html',
  styleUrls: ['./tour-step.component.scss']
})
export class TourStepComponent implements OnInit {
  @Input() step: Step;
  @Input() stepLength: number;
  @Output() stepRemoved = new EventEmitter<void>();

  showDescription: boolean = false;
  form: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
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

  setStepDate(date: Date) {
    console.log(date);
    this.step.date = date;
  }

  public errorsOf(control: AbstractControl): Array<string> {
    const hasSomeError = control.invalid && (control.dirty || control.touched);
    return hasSomeError ? Object.keys(control.errors!) : [];
  }

  onStepRemoved() {
    this.stepRemoved.next();
  }
}
