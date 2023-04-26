import { Input, Directive } from "@angular/core"
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";
import { passwordsMatchValidator } from "./password-validator";

@Directive({
  selector: '[passwordMatchValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: PasswordsMatchDirective, multi: true}]
})

export class PasswordsMatchDirective implements Validator {
  @Input('password') password = ''

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
      return this.password ? passwordsMatchValidator(this.password)(control):null
  }
}
