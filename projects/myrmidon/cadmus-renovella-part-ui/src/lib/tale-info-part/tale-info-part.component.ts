import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';

import { ModelEditorComponentBase } from '@myrmidon/cadmus-ui';
import { AuthService } from '@myrmidon/cadmus-api';
import {
  ThesaurusEntry,
  CadmusValidators,
  DataPinInfo,
  HistoricalDateModel,
} from '@myrmidon/cadmus-core';

import { TaleInfoPart, TALE_INFO_PART_TYPEID } from '../tale-info-part';
import { CitedPerson } from '../cited-persons-part';
import { deepCopy } from '@myrmidon/ng-tools';

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
  public isCollection: FormControl;
  public collectionId: FormControl;
  public containerId: FormControl;
  public ordinal: FormControl;
  public title: FormControl;
  public language: FormControl;
  public genres: FormControl;

  public hasAuthor: FormControl;
  public author: FormControl;
  public hasDedicatee: FormControl;
  public dedicatee: FormControl;
  public narrator: FormControl;
  public place: FormControl;
  public date: FormControl;

  public rubric: FormControl;
  public incipit: FormControl;
  public explicit: FormControl;

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

  constructor(authService: AuthService, formBuilder: FormBuilder) {
    super(authService);
    this.initialGenres = [];
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
    this.genres = formBuilder.control(
      [],
      [Validators.required, CadmusValidators.strictMinLengthValidator(1)]
    );

    this.hasAuthor = formBuilder.control(false);
    this.author = formBuilder.control(null);

    this.hasDedicatee = formBuilder.control(false);
    this.dedicatee = formBuilder.control(null);

    this.narrator = formBuilder.control(null, Validators.maxLength(50));

    this.rubric = formBuilder.control(null, Validators.maxLength(1000));
    this.incipit = formBuilder.control(null, Validators.maxLength(1000));
    this.explicit = formBuilder.control(null, Validators.maxLength(1000));

    this.isCollection = formBuilder.control(false);
    // this.collectionId = formBuilder.control(null, [
    //   Validators.maxLength(50),
    //   CadmusValidators.conditionalValidator(() => {
    //     // collection ID is required when isCollection is true
    //     return this.isCollection.value;
    //   }, Validators.required),
    // ]);
    // this.containerId = formBuilder.control(null, [
    //   Validators.maxLength(50),
    //   CadmusValidators.conditionalValidator(() => {
    //     // container ID is required when isCollection is false
    //     return !this.isCollection.value;
    //   }, Validators.required),
    // ]);
    this.collectionId = formBuilder.control(null, [
      Validators.maxLength(50),
      Validators.required,
    ]);
    this.containerId = formBuilder.control(null, [
      Validators.maxLength(50),
      Validators.required,
    ]);
    this.ordinal = formBuilder.control(0, Validators.min(0));

    this.form = formBuilder.group({
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
      hasDedicatee: this.hasDedicatee,
      dedicatee: this.dedicatee,
      narrator: this.narrator,
      rubric: this.rubric,
      incipit: this.incipit,
      explicit: this.explicit,
    });
  }

  public ngOnInit(): void {
    this.isCollection.valueChanges.subscribe((coll: boolean | undefined) => {
      if (coll) {
        this.collectionId.enable();
        this.containerId.disable();
      } else {
        this.collectionId.disable();
        this.containerId.enable();
      }
      this.form?.updateValueAndValidity();
    });
    this.initEditor();
  }

  private updateForm(model: TaleInfoPart): void {
    if (!model) {
      this.form?.reset();
      this.initialGenres = [];
      this.initialContainerId = undefined;
      return;
    }
    this.isCollection.setValue(model.collectionId ? true : false);
    this.collectionId.setValue(model.collectionId);
    this.containerId.setValue(model.containerId);
    this.initialContainerId = model.containerId;
    this.ordinal.setValue(model.ordinal);
    this.title.setValue(model.title);
    this.language.setValue(model.language);
    this.place.setValue(model.place);
    this.date.setValue(model.date);
    this.genres.setValue(model.genres);
    this.initialGenres = model.genres || [];
    this.hasAuthor.setValue(model.author ? true : false);
    this.author.setValue(model.author);
    this.initialAuthor = model.author;
    this.hasDedicatee.setValue(model.dedicatee ? true : false);
    this.dedicatee.setValue(model.dedicatee);
    this.initialDedicatee = model.dedicatee;
    this.narrator.setValue(model.narrator);
    this.rubric.setValue(model.rubric);
    this.incipit.setValue(model.incipit);
    this.explicit.setValue(model.explicit);
    this.form?.markAsPristine();
  }

  protected onModelSet(model: TaleInfoPart): void {
    this.updateForm(deepCopy(model));
  }

  protected onThesauriSet(): void {
    let key = 'tale-genres';
    if (this.thesauri && this.thesauri[key]) {
      this.taleGenreEntries = this.thesauri[key].entries;
    } else {
      this.taleGenreEntries = undefined;
    }

    key = 'name-part-type-entries';
    if (this.thesauri && this.thesauri[key]) {
      this.namePartTypeEntries = this.thesauri[key].entries;
    } else {
      this.namePartTypeEntries = undefined;
    }

    key = 'tale-languages';
    if (this.thesauri && this.thesauri[key]) {
      this.taleLangEntries = this.thesauri[key].entries;
    } else {
      this.taleLangEntries = undefined;
    }
  }

  protected getModelFromForm(): TaleInfoPart {
    let part = this.model;
    if (!part) {
      part = {
        itemId: this.itemId!,
        id: '',
        typeId: TALE_INFO_PART_TYPEID,
        roleId: this.roleId,
        timeCreated: new Date(),
        creatorId: '',
        timeModified: new Date(),
        userId: '',
        title: '',
        place: '',
        date: {
          a: {
            value: 0,
          },
        },
        language: '',
        genres: [],
      };
    }

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
  }

  public onMultiSelectionChange(selectedIds: string[]): void {
    this.genres.setValue(selectedIds);
  }

  public onContainerEntryChange(entry: DataPinInfo | null): void {
    this.containerId.setValue(entry?.value);
    this.form?.markAsDirty();
  }

  public onAuthorChange(person: CitedPerson): void {
    this.author.setValue(person);
  }

  public onDedicateeChange(person: CitedPerson): void {
    this.dedicatee.setValue(person);
  }
}
