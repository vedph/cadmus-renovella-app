import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  UntypedFormGroup,
  FormControl,
} from '@angular/forms';

import { NgToolsValidators } from '@myrmidon/ng-tools';
import { AuthJwtService } from '@myrmidon/auth-jwt-login';
import { ThesauriSet, ThesaurusEntry } from '@myrmidon/cadmus-core';
import { EditedObject, ModelEditorComponentBase } from '@myrmidon/cadmus-ui';

import {
  PoeticText,
  PoeticTextsPart,
  POETIC_TEXTS_PART_TYPEID,
} from '../poetic-texts-part';
import { DialogService } from '@myrmidon/ng-mat-tools';

/**
 * Poetic texts info component. Thesauri: poetic-text-metres (optional).
 */
@Component({
  selector: 'renovella-poetic-texts-part',
  templateUrl: './poetic-texts-part.component.html',
  styleUrls: ['./poetic-texts-part.component.css'],
})
export class PoeticTextsPartComponent
  extends ModelEditorComponentBase<PoeticTextsPart>
  implements OnInit
{
  public editedText?: PoeticText;
  public editedIndex;

  // poetic-text-metres
  public metreEntries: ThesaurusEntry[] | undefined;

  public texts: FormControl<PoeticText[]>;

  constructor(
    authService: AuthJwtService,
    formBuilder: FormBuilder,
    private _dialog: DialogService
  ) {
    super(authService, formBuilder);
    this.editedIndex = -1;
    // form
    this.texts = formBuilder.control([], {
      validators: NgToolsValidators.strictMinLengthValidator(1),
      nonNullable: true,
    });
  }

  public ngOnInit(): void {
    super.ngOnInit();
  }

  protected buildForm(formBuilder: FormBuilder): FormGroup | UntypedFormGroup {
    return formBuilder.group({
      texts: this.texts,
    });
  }

  private updateThesauri(thesauri: ThesauriSet): void {
    const key = 'poetic-text-metres';
    if (this.hasThesaurus(key)) {
      this.metreEntries = thesauri[key].entries;
    } else {
      this.metreEntries = undefined;
    }
  }

  private updateForm(part?: PoeticTextsPart | null): void {
    if (!part) {
      this.form.reset();
      return;
    }
    this.texts.setValue(part.texts);
    this.form.markAsPristine();
  }

  protected override onDataSet(data?: EditedObject<PoeticTextsPart>): void {
    // thesauri
    if (data?.thesauri) {
      this.updateThesauri(data.thesauri);
    }

    // form
    this.updateForm(data?.value);
  }

  protected getValue(): PoeticTextsPart {
    let part = this.getEditedPart(POETIC_TEXTS_PART_TYPEID) as PoeticTextsPart;
    part.texts = this.texts.value;
    return part;
  }

  public addText(): void {
    this.editText(
      {
        incipit: '',
        metre: '',
      },
      -1
    );
  }

  public editText(text: PoeticText, index: number): void {
    this.editedText = text;
    this.editedIndex = index;
  }

  public closeText(): void {
    this.editedText = undefined;
    this.editedIndex = -1;
  }

  public onTextChange(text: PoeticText): void {
    const texts = [...this.texts.value];
    if (this.editedIndex === -1) {
      texts.push(text);
    } else {
      texts.splice(this.editedIndex, 1, text);
    }
    this.texts.setValue(texts);
    this.texts.markAsDirty();
    this.closeText();
  }

  public removeText(index: number): void {
    this._dialog
      .confirm('Confirm Deletion', `Delete text #${index + 1}?`)
      .subscribe((yes: boolean) => {
        if (yes) {
          const texts = [...this.texts.value];
          texts.splice(index, 1);
          this.texts.setValue(texts);
          this.texts.markAsDirty();
        }
      });
  }

  public moveTextUp(index: number): void {
    if (index < 1) {
      return;
    }
    const texts = [...this.texts.value];
    const item = this.texts.value[index];
    texts.splice(index, 1);
    texts.splice(index - 1, 0, item);
    this.texts.setValue(texts);
    this.texts.markAsDirty();
  }

  public moveTextDown(index: number): void {
    if (index + 1 >= this.texts.value.length) {
      return;
    }
    const texts = [...this.texts.value];
    const item = this.texts.value[index];
    texts.splice(index, 1);
    texts.splice(index + 1, 0, item);
    this.texts.setValue(texts);
    this.texts.markAsDirty();
  }
}
