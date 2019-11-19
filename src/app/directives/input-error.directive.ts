
import {tap, map, takeWhile, merge} from 'rxjs/operators';
import {Directive, DoCheck, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef,} from "@angular/core";
import {AbstractControl, ControlContainer, FormGroup, FormGroupDirective} from "@angular/forms";
import {Subject} from "rxjs";

@Directive({
  selector: '[forEveryErrorIn]'
})
export class InputErrorDirective implements OnInit, OnDestroy, DoCheck {
  @Input('forEveryErrorIn') inputControl: AbstractControl | string;

  private destroyed: boolean = false;

  private controlTouched$ = new Subject<boolean>();

  private formControl: AbstractControl;

  constructor(
    private container: ControlContainer,
    private vcr : ViewContainerRef,
    private tpl : TemplateRef<any>) {
  }

  ngDoCheck(): void {
    this.controlTouched$.next(this.formControl.touched);
  }

  ngOnInit(): void {
    this.formControl = this.getFormControl();

    this.formControl.statusChanges.pipe(
      merge(this.controlTouched$),
      takeWhile(() => !this.destroyed),
      map(() => this.hasError()),
      tap(hasError => {
        this.vcr.clear();
        if (hasError) {
          this.getErrorKeys().forEach(errorKey => {
            this.vcr.createEmbeddedView(this.tpl, {
              $implicit: errorKey
            })
          });
        }
      }),).subscribe();
  }

  ngOnDestroy(): void {
    this.destroyed = true;
  }

  private hasError(): boolean {
    return this.formControl.invalid && (this.formControl.dirty || this.formControl.touched);
  }

  private getErrorKeys(): ReadonlyArray<string> {
    return this.formControl.errors ? Object.keys(this.formControl.errors) : [];
  }

  private get form(): FormGroup | null {
    return this.container.formDirective ? (this.container.formDirective as FormGroupDirective).form : null;
  }

  private getFormControl(): AbstractControl {
    if (typeof this.inputControl === "string") {
      if (this.form != null) {
        return this.form.get(this.inputControl)!;
      } else {
        throw new Error("Failed to find the containing form for the given form control " + this.inputControl);
      }
    } else {
      return this.inputControl;
    }
  }
}
