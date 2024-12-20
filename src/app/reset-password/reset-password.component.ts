import { Component } from '@angular/core';
import {
  UntypedFormGroup,
  UntypedFormControl,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthJwtAccountService } from '@myrmidon/auth-jwt-admin';

@Component({
  selector: 'cadmus-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
  standalone: false,
})
export class ResetPasswordComponent {
  public busy: boolean | undefined;
  public form: UntypedFormGroup;
  public email: UntypedFormControl;

  constructor(
    private _snackbar: MatSnackBar,
    private _accountService: AuthJwtAccountService,
    formBuilder: UntypedFormBuilder
  ) {
    this.email = formBuilder.control(null, [
      Validators.required,
      Validators.email,
    ]);
    this.form = formBuilder.group({
      email: this.email,
    });
  }

  public reset(): void {
    if (this.busy) {
      return;
    }

    this.busy = true;
    this._accountService.resetPassword(this.email.value).subscribe(
      () => {
        this.busy = false;
        this._snackbar.open(`Message sent to ${this.email.value}`, 'OK');
      },
      (error) => {
        this.busy = false;
        console.error(error);
        this._snackbar.open(
          `Error sending message to ${this.email.value}`,
          'OK'
        );
      }
    );
  }
}
