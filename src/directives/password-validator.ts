import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function passwordStrengthValidator(): ValidatorFn{
  return (control: AbstractControl) : ValidationErrors | null => {
    const value = control.value;

    if(!value){
      return null;
    }

    const hasUpperCase = /[A-Z]+/.test(value);

    const hasLowerCase = /[a-z]+/.test(value);

    const hasNumeric = /[0-9]+/.test(value);

    const passwordValid = hasLowerCase && hasUpperCase && hasNumeric
    return  {
      passwordStrength: {
        hasUpperCase: hasUpperCase,
        hasLowerCase: hasLowerCase,
        hasNumeric: hasNumeric
      }
    }
  }
}

export function passwordsMatchValidator(password: string): ValidatorFn {
  return (control: AbstractControl) : ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const matches = password == value;
    return matches ? {passwordsMatch: {value: true}} : null;
  }
}
