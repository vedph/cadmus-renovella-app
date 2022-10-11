import { Component, OnInit } from '@angular/core';
import {
  UntypedFormArray,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

import { deepCopy } from '@myrmidon/ng-tools';
import { AuthJwtService } from '@myrmidon/auth-jwt-login';
import { CadmusValidators, ThesaurusEntry } from '@myrmidon/cadmus-core';
import { ModelEditorComponentBase } from '@myrmidon/cadmus-ui';

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
  public form: UntypedFormGroup;

  constructor(authService: AuthJwtService, private _formBuilder: UntypedFormBuilder) {
    super(authService);
    // form
    this.texts = _formBuilder.array(
      [],
      CadmusValidators.strictMinLengthValidator(1)
    );
    this.form = _formBuilder.group({
      texts: this.texts,
    });
  }

  public ngOnInit(): void {
    this.initEditor();
  }

  private updateForm(model: PoeticTextsPart): void {
    if (!model) {
      this.form.reset();
      return;
    }
    this.texts.clear();
    if (model.texts) {
      for (let text of model.texts) {
        this.texts.controls.push(this.getTextGroup(text));
      }
    }
    this.form.markAsPristine();
  }

  protected onModelSet(model: PoeticTextsPart): void {
    this.updateForm(deepCopy(model));
  }

  protected onThesauriSet(): void {
    const key = 'poetic-text-metres';
    if (this.thesauri && this.thesauri[key]) {
      this.metreEntries = this.thesauri[key].entries;
    } else {
      this.metreEntries = undefined;
    }
  }

  protected getModelFromForm(): PoeticTextsPart {
    let part = this.model;
    if (!part) {
      part = {
        itemId: this.itemId!,
        id: '',
        typeId: POETIC_TEXTS_PART_TYPEID,
        roleId: this.roleId,
        timeCreated: new Date(),
        creatorId: '',
        timeModified: new Date(),
        userId: '',
        texts: [],
      };
    }
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
