import { Component, effect, EventEmitter, input, Input, model, output, Output } from '@angular/core';
import { ThesaurusEntry } from '@myrmidon/cadmus-core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';

import { PoeticText } from '../poetic-texts-part';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'renovella-poetic-text',
  templateUrl: './poetic-text.component.html',
  styleUrls: ['./poetic-text.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
  ],
})
export class PoeticTextComponent {
  public readonly text = model<PoeticText>();

  // poetic-text-metres
  public readonly metreEntries = input<ThesaurusEntry[]>();

  public readonly close = output();

  public incipit: FormControl<string>;
  public metre: FormControl<string>;
  public note: FormControl<string | null>;
  public form: FormGroup;

  constructor(formBuilder: FormBuilder) {
    // form
    this.incipit = formBuilder.control('', {
      validators: [Validators.required, Validators.maxLength(500)],
      nonNullable: true,
    });
    this.metre = formBuilder.control('', {
      validators: [Validators.required, Validators.maxLength(50)],
      nonNullable: true,
    });
    this.note = formBuilder.control(null, Validators.maxLength(500));
    this.form = formBuilder.group({
      incipit: this.incipit,
      metre: this.metre,
      note: this.note,
    });

    effect(() => {
      this.updateForm(this.text());
    });
  }

  private updateForm(value?: PoeticText): void {
    if (!value) {
      this.form.reset();
      return;
    }
    this.incipit.setValue(value.incipit);
    this.metre.setValue(value.metre);
    this.note.setValue(value.note || null);
    this.form.markAsPristine();
  }

  private getPoeticText(): PoeticText {
    return {
      incipit: this.incipit.value.trim(),
      metre: this.metre.value.trim(),
      note: this.note.value?.trim(),
    };
  }

  public cancel(): void {
    this.close.emit();
  }

  public save(): void {
    if (this.form.invalid) {
      return;
    }
    this.text.set(this.getPoeticText());
  }
}
