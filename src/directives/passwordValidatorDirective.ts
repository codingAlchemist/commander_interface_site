import { Directive } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";
import { passwordStrengthValidator } from "./password-validator";

@Directive({
  selector:'[passwordValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting:PasswordValidatorDirective,
      multi: true
    }
  ]
})
export class PasswordValidatorDirective implements Validator {
  validate(control: AbstractControl<any, any>): ValidationErrors | null {
      return passwordStrengthValidator()(control)
  }
}
