import {FormArray, FormControl, FormGroup} from '@angular/forms';

export default class MarkFormDirtyUtils {

  static markGroupDirty(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      switch (formGroup.get(key).constructor.name) {
        case "FormGroup":
          this.markGroupDirty(formGroup.get(key) as FormGroup);
          break;
        case "FormArray":
          this.markArrayDirty(formGroup.get(key) as FormArray);
          break;
        case "FormControl":
          this.markControlDirty(formGroup.get(key) as FormControl);
          break;
      }
    });
  }

  static markArrayDirty(formArray: FormArray) {
    formArray.controls.forEach(control => {
      switch (control.constructor.name) {
        case "FormGroup":
          this.markGroupDirty(control as FormGroup);
          break;
        case "FormArray":
          this.markArrayDirty(control as FormArray);
          break;
        case "FormControl":
          this.markControlDirty(control as FormControl);
          break;
      }
    });
  }

  static markControlDirty(formControl: FormControl) {
    formControl.markAsDirty();
  }
}
