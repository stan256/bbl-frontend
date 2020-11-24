import {ValidationErrors, ValidatorFn} from '@angular/forms';

export function dateValidator(prevDate: Date, currentDate: Date):ValidatorFn {
  return (): ValidationErrors => {
    if (currentDate && prevDate && (currentDate.getTime() < prevDate.getTime())) {
      return <ValidationErrors> { invalidDate: true };
    } else {
      return null;
    }
  }
}
