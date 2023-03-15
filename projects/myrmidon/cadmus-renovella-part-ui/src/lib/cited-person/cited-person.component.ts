import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import { ThesaurusEntry } from '@myrmidon/cadmus-core';
import { DecoratedId } from '@myrmidon/cadmus-refs-decorated-ids';
import { DocReference } from '@myrmidon/cadmus-refs-doc-references';
import { ProperName, ProperNamePiece } from '@myrmidon/cadmus-refs-proper-name';
import { NgToolsValidators } from '@myrmidon/ng-tools';

import { CitedPerson } from '../cited-persons-part';

@Component({
  selector: 'renovella-cited-person',
  templateUrl: './cited-person.component.html',
  styleUrls: ['./cited-person.component.css'],
})
export class CitedPersonComponent implements OnInit {
  private _person: CitedPerson | undefined;

  @Input()
  public get person(): CitedPerson | undefined | null {
    return this._person;
  }
  public set person(value: CitedPerson | undefined | null) {
    if (this._person === value) {
      return;
    }
    this._person = value || undefined;
    this.updateForm(this._person);
  }

  // languages
  @Input()
  public langEntries: ThesaurusEntry[] | undefined;
  // person-name-tags
  @Input()
  public nameTagEntries: ThesaurusEntry[] | undefined;
  // person-name-types
  @Input()
  public nameTypeEntries: ThesaurusEntry[] | undefined;
  // person-id-tags
  @Input()
  public idTagEntries: ThesaurusEntry[] | undefined;
  @Input()
  public idTypeEntries: ThesaurusEntry[] | undefined;

  @Output()
  public personChange: EventEmitter<CitedPerson>;

  @Output()
  public editorClose: EventEmitter<any>;

  public sources$: BehaviorSubject<DocReference[]>;

  public language: FormControl<string | null>;
  public tag: FormControl<string | null>;
  public rank: FormControl<number>;
  public parts: FormArray;
  public sources: FormControl<DocReference[]>;
  public ids: FormControl<DecoratedId[]>;
  public form: FormGroup;

  constructor(private _formBuilder: FormBuilder) {
    this.sources$ = new BehaviorSubject<DocReference[]>([]);

    // events
    this.personChange = new EventEmitter<CitedPerson>();
    this.editorClose = new EventEmitter<any>();

    // form
    this.language = _formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(50),
    ]);
    this.tag = _formBuilder.control(null, Validators.maxLength(50));
    this.rank = _formBuilder.control(0, { nonNullable: true });
    this.parts = _formBuilder.array(
      [],
      NgToolsValidators.strictMinLengthValidator(1)
    );
    this.sources = _formBuilder.control([], { nonNullable: true });
    this.ids = _formBuilder.control([], { nonNullable: true });

    // this is the parent form for both name and ids
    this.form = _formBuilder.group({
      language: this.language,
      tag: this.tag,
      rank: this.rank,
      parts: this.parts,
      sources: this.sources,
      ids: this.ids,
    });
  }

  public ngOnInit(): void {
    if (this._person) {
      this.updateForm(this._person);
    }
  }

  private updateForm(model: CitedPerson | undefined): void {
    if (!model) {
      this.form.reset();
    } else {
      this.language.setValue(model.name?.language);
      this.sources.setValue(model.sources || []);
      this.ids.setValue(model.ids || []);
      this.tag.setValue(model.name?.tag || null);
      this.rank.setValue(model.rank || 0);
      this.parts.clear();
      for (const p of model.name?.pieces || []) {
        this.addPart(p);
      }
      this.form.markAsPristine();
    }
  }

  private getName(): ProperName {
    const pieces: ProperNamePiece[] = [];

    for (let i = 0; i < this.parts.length; i++) {
      const g = this.parts.controls[i] as FormGroup;
      pieces.push({
        type: g.controls.type.value,
        value: g.controls.value.value?.trim(),
      });
    }

    return {
      language: this.language.value || '',
      tag: this.tag.value || undefined,
      pieces,
    };
  }

  private getPerson(): CitedPerson {
    return {
      name: this.getName(),
      rank: +(this.rank.value || 0),
      ids: this.ids.value?.length ? this.ids.value : undefined,
      sources: this.sources.value?.length ? this.sources.value : undefined,
    };
  }

  // #region Pieces
  private getPartGroup(piece?: ProperNamePiece): FormGroup {
    return this._formBuilder.group({
      type: this._formBuilder.control(piece?.type, [
        Validators.required,
        Validators.maxLength(20),
      ]),
      value: this._formBuilder.control(piece?.value, [
        Validators.required,
        Validators.maxLength(50),
      ]),
    });
  }

  public addPart(piece?: ProperNamePiece): void {
    this.parts.push(this.getPartGroup(piece));
  }

  public removePart(index: number): void {
    this.parts.removeAt(index);
  }

  public movePartUp(index: number): void {
    if (index < 1) {
      return;
    }
    const item = this.parts.controls[index];
    this.parts.removeAt(index);
    this.parts.insert(index - 1, item);
  }

  public movePartDown(index: number): void {
    if (index + 1 >= this.parts.length) {
      return;
    }
    const item = this.parts.controls[index];
    this.parts.removeAt(index);
    this.parts.insert(index + 1, item);
  }

  public clearParts(): void {
    this.parts.clear();
  }
  // #endregion

  public onIdsChange(ids: DecoratedId[]): void {
    this.ids.setValue(ids);
    this.form.markAsDirty();
  }

  public onSourcesChange(sources: DocReference[]): void {
    this.sources.setValue(sources);
    this.sources.updateValueAndValidity();
    this.sources.markAsDirty();
  }

  public cancel(): void {
    this.editorClose.emit();
  }

  public save(): void {
    if (this.form.invalid) {
      return;
    }
    this._person = this.getPerson();
    this.personChange.emit(this._person);
  }
}
