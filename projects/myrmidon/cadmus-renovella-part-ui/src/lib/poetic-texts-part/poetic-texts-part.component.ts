import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  UntypedFormArray,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

import { deepCopy, NgToolsValidators } from '@myrmidon/ng-tools';
import { AuthJwtService } from '@myrmidon/auth-jwt-login';
import { ThesauriSet, ThesaurusEntry } from '@myrmidon/cadmus-core';
import { EditedObject, ModelEditorComponentBase } from '@myrmidon/cadmus-ui';

import {
  PoeticText,
  PoeticTextsPart,
  POETIC_TEXTS_PART_TYPEID,
} from '../poetic-texts-part';

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
  // poetic-text-metres
  public metreEntries: ThesaurusEntry[] | undefined;

  public texts: UntypedFormArray;

  constructor(
    authService: AuthJwtService,
    private _formBuilder: UntypedFormBuilder
  ) {
    super(authService, _formBuilder);
    // form
    this.texts = _formBuilder.array(
      [],
      NgToolsValidators.strictMinLengthValidator(1)
    );
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
    this.texts.clear();
    if (part.texts) {
      for (let text of part.texts) {
        this.texts.controls.push(this.getTextGroup(text));
      }
    }
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
    part.texts = this.getTexts();
    return part;
  }

  private getTextGroup(item?: PoeticText): UntypedFormGroup {
    return this._formBuilder.group({
      incipit: this._formBuilder.control(item?.incipit, [
        Validators.required,
        Validators.maxLength(500),
      ]),
      metre: this._formBuilder.control(item?.metre, [
        Validators.required,
        Validators.maxLength(50),
      ]),
      note: this._formBuilder.control(item?.note, Validators.maxLength(500)),
    });
  }

  private getTexts(): PoeticText[] {
    const texts: PoeticText[] = [];
    for (let i = 0; i < this.texts.length; i++) {
      const g = this.texts.at(i) as UntypedFormGroup;
      texts.push({
        incipit: g.controls.incipit.value?.trim(),
        metre: g.controls.metre.value?.trim(),
        note: g.controls.note.value?.trim(),
      });
    }
    return texts;
  }

  public addText(item?: PoeticText): void {
    this.texts.push(this.getTextGroup(item));
    this.texts.markAsDirty();
  }

  public removeText(index: number): void {
    this.texts.removeAt(index);
    this.texts.markAsDirty();
  }

  public moveTextUp(index: number): void {
    if (index < 1) {
      return;
    }
    const item = this.texts.controls[index];
    this.texts.removeAt(index);
    this.texts.insert(index - 1, item);
    this.texts.markAsDirty();
  }

  public moveTextDown(index: number): void {
    if (index + 1 >= this.texts.length) {
      return;
    }
    const item = this.texts.controls[index];
    this.texts.removeAt(index);
    this.texts.insert(index + 1, item);
    this.texts.markAsDirty();
  }
}
