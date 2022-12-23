import { Component, OnInit } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormBuilder as FormBuilder,
  Validators,
  FormGroup,
  UntypedFormGroup,
} from '@angular/forms';

import { EditedObject, ModelEditorComponentBase } from '@myrmidon/cadmus-ui';
import { ThesaurusEntry, DataPinInfo, ThesauriSet } from '@myrmidon/cadmus-core';

import { deepCopy } from '@myrmidon/ng-tools';
import { AuthJwtService } from '@myrmidon/auth-jwt-login';
import { HistoricalDateModel } from '@myrmidon/cadmus-refs-historical-date';

import { TaleInfoPart, TALE_INFO_PART_TYPEID } from '../tale-info-part';
import { CitedPerson } from '../cited-persons-part';
import { Flag } from '@myrmidon/cadmus-ui-flags-picker';

/**
 * TaleInfo editor component.
 * Thesauri: tale-languages (optional), tale-genres (required),
 * name-part-type-entries (required).
 */
@Component({
  selector: 'renovella-tale-info-part',
  templateUrl: './tale-info-part.component.html',
  styleUrls: ['./tale-info-part.component.css'],
})
export class TaleInfoPartComponent
  extends ModelEditorComponentBase<TaleInfoPart>
  implements OnInit
{
  public isCollection: UntypedFormControl;
  public collectionId: UntypedFormControl;
  public containerId: UntypedFormControl;
  public ordinal: UntypedFormControl;
  public title: UntypedFormControl;
  public language: UntypedFormControl;
  public genres: UntypedFormControl;

  public hasAuthor: UntypedFormControl;
  public author: UntypedFormControl;
  public hasDedicatee: UntypedFormControl;
  public dedicatee: UntypedFormControl;
  public structure: UntypedFormControl;
  public narrator: UntypedFormControl;
  public place: UntypedFormControl;
  public date: UntypedFormControl;

  public rubric: UntypedFormControl;
  public incipit: UntypedFormControl;
  public explicit: UntypedFormControl;

  public initialGenres: string[];
  public initialContainerId: string | undefined;
  public initialAuthor: CitedPerson | undefined;
  public initialDedicatee: CitedPerson | undefined;

  // tale-languages
  public taleLangEntries: ThesaurusEntry[] | undefined;
  // tale-genres
  public taleGenreEntries: ThesaurusEntry[] | undefined;
  // name-part-types
  public namePartTypeEntries: ThesaurusEntry[] | undefined;

  public availGenreFlags: Flag[];

  constructor(authService: AuthJwtService, formBuilder: FormBuilder) {
    super(authService, formBuilder);
    this.initialGenres = [];
    this.availGenreFlags = [];
    // form
    this.title = formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(200),
    ]);
    this.language = formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(50),
    ]);
    this.place = formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(100),
    ]);
    this.date = formBuilder.control(null, Validators.required);
    this.genres = formBuilder.control([]);

    this.hasAuthor = formBuilder.control(false);
    this.author = formBuilder.control(null);
    this.structure = formBuilder.control(null, Validators.maxLength(3000));

    this.hasDedicatee = formBuilder.control(false);
    this.dedicatee = formBuilder.control(null);

    this.narrator = formBuilder.control(null, Validators.maxLength(50));

    this.rubric = formBuilder.control(null, Validators.maxLength(1000));
    this.incipit = formBuilder.control(null, Validators.maxLength(1000));
    this.explicit = formBuilder.control(null, Validators.maxLength(1000));

    this.isCollection = formBuilder.control(false);
    this.collectionId = formBuilder.control(null, [
      Validators.maxLength(50),
      Validators.required,
    ]);
    this.containerId = formBuilder.control(null, [
      Validators.maxLength(50),
      Validators.required,
    ]);
    this.ordinal = formBuilder.control(0, Validators.min(0));
  }

  protected buildForm(formBuilder: FormBuilder): FormGroup | UntypedFormGroup {
    return formBuilder.group({
      isCollection: this.isCollection,
      collectionId: this.collectionId,
      containerId: this.containerId,
      ordinal: this.ordinal,
      title: this.title,
      language: this.language,
      place: this.place,
      date: this.date,
      genres: this.genres,
      hasAuthor: this.hasAuthor,
      author: this.author,
      structure: this.structure,
      hasDedicatee: this.hasDedicatee,
      dedicatee: this.dedicatee,
      narrator: this.narrator,
      rubric: this.rubric,
      incipit: this.incipit,
      explicit: this.explicit,
    });
  }

  public ngOnInit(): void {
    super.ngOnInit();
    this.isCollection.valueChanges.subscribe((coll: boolean | undefined) => {
      if (coll) {
        this.collectionId.enable();
        this.containerId.disable();
      } else {
        this.collectionId.disable();
        this.containerId.enable();
      }
      this.form.updateValueAndValidity();
    });
  }

  private updateThesauri(thesauri: ThesauriSet): void {
    let key = 'tale-genres';
    if (this.hasThesaurus(key)) {
      this.taleGenreEntries = thesauri[key].entries;
      this.availGenreFlags = this.taleGenreEntries!.map((e) => {
        return {
          id: e.id,
          label: e.value,
        };
      });
    } else {
      this.taleGenreEntries = undefined;
      this.availGenreFlags = [];
    }

    key = 'name-part-type-entries';
    if (this.hasThesaurus(key)) {
      this.namePartTypeEntries = thesauri[key].entries;
    } else {
      this.namePartTypeEntries = undefined;
    }

    key = 'tale-languages';
    if (this.hasThesaurus(key)) {
      this.taleLangEntries = thesauri[key].entries;
    } else {
      this.taleLangEntries = undefined;
    }
  }

  private updateForm(part?: TaleInfoPart | null): void {
    if (!part) {
      this.form.reset();
      this.initialGenres = [];
      this.initialContainerId = undefined;
      return;
    }
    this.isCollection.setValue(part.collectionId ? true : false);
    this.collectionId.setValue(part.collectionId);
    this.containerId.setValue(part.containerId);
    this.initialContainerId = part.containerId;
    this.ordinal.setValue(part.ordinal);
    this.title.setValue(part.title);
    this.language.setValue(part.language);
    this.place.setValue(part.place);
    this.date.setValue(part.date);
    this.genres.setValue(part.genres);
    this.initialGenres = part.genres || [];
    this.hasAuthor.setValue(part.author ? true : false);
    this.author.setValue(part.author);
    this.initialAuthor = part.author;
    this.structure.setValue(part.structure);
    this.hasDedicatee.setValue(part.dedicatee ? true : false);
    this.dedicatee.setValue(part.dedicatee);
    this.initialDedicatee = part.dedicatee;
    this.narrator.setValue(part.narrator);
    this.rubric.setValue(part.rubric);
    this.incipit.setValue(part.incipit);
    this.explicit.setValue(part.explicit);
    this.form.markAsPristine();
  }

  protected override onDataSet(data?: EditedObject<TaleInfoPart>): void {
    // thesauri
    if (data?.thesauri) {
      this.updateThesauri(data.thesauri);
    }

    // form
    this.updateForm(data?.value);
  }

  protected getValue(): TaleInfoPart {
    let part = this.getEditedPart(TALE_INFO_PART_TYPEID) as TaleInfoPart;

    if (this.isCollection.value) {
      part.collectionId = this.collectionId.value?.trim();
      part.ordinal = 0;
    } else {
      part.containerId = this.containerId.value?.trim();
      part.ordinal = +this.ordinal.value || 0;
    }
    part.title = this.title.value?.trim();
    part.language = this.language.value?.trim();
    part.genres = this.genres.value || [];
    if (this.hasAuthor.value) {
      part.author = this.author.value;
    }
    part.structure = this.structure.value?.trim();
    if (this.hasDedicatee.value) {
      part.dedicatee = this.dedicatee.value;
    }
    part.narrator = this.narrator.value?.trim();
    part.place = this.place.value?.trim();
    part.date = this.date.value;
    part.rubric = this.rubric.value?.trim();
    part.incipit = this.incipit.value?.trim();
    part.explicit = this.explicit.value?.trim();

    return part;
  }

  public onDateChange(date: HistoricalDateModel): void {
    this.date.setValue(date);
    this.date.updateValueAndValidity();
    this.date.markAsDirty();
  }

  public onFlagsChange(selectedIds: string[]): void {
    this.genres.setValue(selectedIds);
    this.genres.updateValueAndValidity();
    this.genres.markAsDirty();
  }

  public onContainerEntryChange(entry: DataPinInfo | null): void {
    this.containerId.setValue(entry?.value);
    this.containerId.updateValueAndValidity();
    this.containerId.markAsDirty();
  }

  public onAuthorChange(person: CitedPerson): void {
    this.author.setValue(person);
    this.author.updateValueAndValidity();
    this.author.markAsDirty();
  }

  public onDedicateeChange(person: CitedPerson): void {
    this.dedicatee.setValue(person);
    this.dedicatee.updateValueAndValidity();
    this.dedicatee.markAsDirty();
  }
}
