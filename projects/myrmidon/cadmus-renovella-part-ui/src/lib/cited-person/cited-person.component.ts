import { Component, effect, input, model, output } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';

import { ThesaurusEntry } from '@myrmidon/cadmus-core';
import {
  DecoratedId,
  DecoratedIdsComponent,
} from '@myrmidon/cadmus-refs-decorated-ids';
import {
  DocReference,
  DocReferencesComponent,
} from '@myrmidon/cadmus-refs-doc-references';
import { ProperName, ProperNamePiece } from '@myrmidon/cadmus-refs-proper-name';
import { NgxToolsValidators } from '@myrmidon/ngx-tools';

import { CitedPerson } from '../cited-persons-part';

@Component({
  selector: 'renovella-cited-person',
  templateUrl: './cited-person.component.html',
  styleUrls: ['./cited-person.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    DecoratedIdsComponent,
    DocReferencesComponent,
  ],
})
export class CitedPersonComponent {
  public readonly person = model<CitedPerson>();

  // languages
  public readonly langEntries = input<ThesaurusEntry[]>();
  // person-name-tags
  public readonly nameTagEntries = input<ThesaurusEntry[]>();
  // person-name-types
  public readonly nameTypeEntries = input<ThesaurusEntry[]>();
  // person-id-tags
  public readonly idTagEntries = input<ThesaurusEntry[]>();
  public readonly idTypeEntries = input<ThesaurusEntry[]>();

  public readonly editorClose = output();

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

    this.language = _formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(50),
    ]);
    this.tag = _formBuilder.control(null, Validators.maxLength(50));
    this.rank = _formBuilder.control(0, { nonNullable: true });
    this.parts = _formBuilder.array(
      [],
      NgxToolsValidators.strictMinLengthValidator(1)
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

    effect(() => {
      this.updateForm(this.person());
    });
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
        type: g.controls['type'].value,
        value: g.controls['value'].value?.trim(),
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
    this.person.set(this.getPerson());
  }
}
