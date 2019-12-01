import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Step} from "../../model/Step";
import {ModalService} from "../shared/modal-window/modal.service";
import {Subject} from "rxjs";
import {take, tap} from "rxjs/operators";

@Component({
  selector: 'app-tour-steps',
  templateUrl: './tour-steps.component.html',
  styleUrls: ['./tour-steps.component.scss']
})
export class TourStepsComponent implements OnInit {
  value: Date;
  steps: Array<Step> = [];
  removeStepConfirmation$ = new Subject<boolean>();

  @Output() stepsUpdated = new EventEmitter<ReadonlyArray<Step>>();

  constructor(private modalService: ModalService) { }

  ngOnInit() {
    this.addStep();
  }

  private addStep() {
    if (!this.steps.length) {
      this.steps.push(new Step());
    } else {
      const lastStep = this.steps[this.steps.length - 1];
      if (lastStep.title || lastStep.description)
        this.steps.push(new Step());
    }

    this.stepsUpdated.next(this.steps);
  }

  removeStep(i: number) {
    this.modalService.open("stepRemovePopup");
    this.removeStepConfirmation$.pipe(
      take(1),
      tap(confirmed => {
        this.closeModal();
        if (confirmed)
          this.steps.splice(i, 1);
      })
    ).subscribe();
  }

  confirmRemove() {
    this.removeStepConfirmation$.next(true);
  }

  closeModal() {
    this.removeStepConfirmation$.next(false);
    this.modalService.close('stepRemovePopup');
  }
}
