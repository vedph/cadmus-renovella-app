import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ThesaurusEntry } from '@myrmidon/cadmus-core';

import { PoeticText } from '../poetic-texts-part';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'renovella-poetic-text',
  templateUrl: './poetic-text.component.html',
  styleUrls: ['./poetic-text.component.css'],
})
export class PoeticTextComponent {
  private _text?: PoeticText;

  @Input()
  public get text(): PoeticText | undefined {
    return this._text;
  }
  public set text(value: PoeticText | undefined) {
    if (this._text === value) {
      return;
    }
    this._text = value;
    this.updateForm(this._text);
  }

  // poetic-text-metres
  @Input()
  public metreEntries: ThesaurusEntry[] | undefined;

  @Output()
  public textChange: EventEmitter<PoeticText>;

  @Output()
  public close: EventEmitter<any>;

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
    // events
    this.textChange = new EventEmitter<PoeticText>();
    this.close = new EventEmitter<any>();
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
    this._text = this.getPoeticText();
    this.textChange.emit(this._text);
  }
}
