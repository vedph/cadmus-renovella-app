import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  Validators,
  FormArray,
  FormGroup,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { ModelEditorComponentBase } from '@myrmidon/cadmus-ui';
import { AuthService } from '@myrmidon/cadmus-api';
import {
  ThesaurusEntry,
  deepCopy,
  CadmusValidators,
  HistoricalDateModel,
} from '@myrmidon/cadmus-core';

import {
  StoryCharacter,
  StoryPlace,
  TaleStoryPart,
  TALE_STORY_PART_TYPEID,
} from '../tale-story-part';

/**
 * Tale story editor component.
 * Thesauri: story-roles, story-place-types, story-ages (all optional).
 */
@Component({
  selector: 'renovella-tale-story-part',
  templateUrl: './tale-story-part.component.html',
  styleUrls: ['./tale-story-part.component.css'],
})
export class TaleStoryPartComponent
  extends ModelEditorComponentBase<TaleStoryPart>
  implements OnInit, OnDestroy
{
  private _charSubs: Subscription[];
  private _placeSubs: Subscription[];

  public summary: FormControl;
  public prologue: FormControl;
  public epilogue: FormControl;
  public date: FormControl;
  public places: FormArray;
  public characters: FormArray;

  // story-roles
  public storyRoleEntries: ThesaurusEntry[] | undefined;
  // story-place-types
  public storyPlaceTypeEntries: ThesaurusEntry[] | undefined;
  // story-ages
  public storyAgeEntries: ThesaurusEntry[] | undefined;

  constructor(authService: AuthService, private _formBuilder: FormBuilder) {
    super(authService);
    this._charSubs = [];
    this._placeSubs = [];
    // form
    this.summary = _formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(5000),
    ]);
    this.prologue = _formBuilder.control(null, Validators.maxLength(1000));
    this.epilogue = _formBuilder.control(null, Validators.maxLength(1000));
    this.characters = _formBuilder.array(
      [],
      CadmusValidators.strictMinLengthValidator(1)
    );
    this.date = _formBuilder.control(null, Validators.required);
    this.places = _formBuilder.array(
      [],
      CadmusValidators.strictMinLengthValidator(1)
    );
    this.form = _formBuilder.group({
      summary: this.summary,
      prologue: this.prologue,
      epilogue: this.epilogue,
      characters: this.characters,
      date: this.date,
      places: this.places,
    });
  }

  public ngOnInit(): void {
    this.initEditor();
  }

  private unsubscribeChars(): void {
    for (let i = 0; i < this._charSubs.length; i++) {
      this._charSubs[i].unsubscribe();
    }
  }

  private unsubscribePlaces(): void {
    for (let i = 0; i < this._placeSubs.length; i++) {
      this._placeSubs[i].unsubscribe();
    }
  }

  public ngOnDestroy(): void {
    this.unsubscribeChars();
    this.unsubscribePlaces();
  }

  private updateForm(model: TaleStoryPart): void {
    this.unsubscribeChars();
    this.unsubscribePlaces();
    if (!model) {
      this.form.reset();
      return;
    }
    this.summary.setValue(model.summary);
    this.prologue.setValue(model.prologue);
    this.epilogue.setValue(model.epilogue);
    this.characters.clear();
    if (model.characters) {
      for (let c of model.characters) {
        this.addCharacter(c);
      }
    }
    this.date.setValue(model.date);
    this.places.clear();
    if (model.places) {
      for (let p of model.places) {
        this.addPlace(p);
      }
    }

    this.form.markAsPristine();
  }

  protected onModelSet(model: TaleStoryPart): void {
    this.updateForm(deepCopy(model));
  }

  protected onThesauriSet(): void {
    let key = 'story-roles';
    if (this.thesauri && this.thesauri[key]) {
      this.storyRoleEntries = this.thesauri[key].entries;
    } else {
      this.storyRoleEntries = undefined;
    }

    key = 'story-place-types';
    if (this.thesauri && this.thesauri[key]) {
      this.storyPlaceTypeEntries = this.thesauri[key].entries;
    } else {
      this.storyPlaceTypeEntries = undefined;
    }

    key = 'story-ages';
    if (this.thesauri && this.thesauri[key]) {
      this.storyAgeEntries = this.thesauri[key].entries;
    } else {
      this.storyAgeEntries = undefined;
    }
  }

  protected getModelFromForm(): TaleStoryPart {
    let part = this.model;
    if (!part) {
      part = {
        itemId: this.itemId,
        id: '',
        typeId: TALE_STORY_PART_TYPEID,
        roleId: this.roleId,
        timeCreated: new Date(),
        creatorId: '',
        timeModified: new Date(),
        userId: '',
        summary: '',
        characters: [],
        places: [],
      };
    }
    part.summary = this.summary.value?.trim();
    part.prologue = this.prologue.value?.trim();
    part.epilogue = this.epilogue.value?.trim();
    part.characters = this.getCharacters();
    part.date = this.date.value;
    part.places = this.getPlaces();

    return part;
  }

  public onDateChange(date: HistoricalDateModel): void {
    this.date.setValue(date);
    this.form.markAsDirty();
  }

  //#region Characters
  private getCharacterGroup(character?: StoryCharacter): FormGroup {
    return this._formBuilder.group({
      name: this._formBuilder.control(
        character?.name,
        Validators.maxLength(100)
      ),
      sex: this._formBuilder.control(
        character?.sex,
        Validators.pattern(/^[MF]$/)
      ),
      role: this._formBuilder.control(character?.role, [
        Validators.required,
        Validators.maxLength(50),
      ]),
      isGroup: this._formBuilder.control(character?.isGroup || false),
    });
  }

  public addCharacter(character?: StoryCharacter): void {
    const g = this.getCharacterGroup(character);
    this._charSubs.push(
      g.valueChanges.pipe(debounceTime(300)).subscribe((_) => {
        this.form.markAsDirty();
      })
    );
    this.characters.push(g);
    this.characters.markAsDirty();
    this.characters.updateValueAndValidity();
  }

  private swapArrElems(a: any[], i: number, j: number): void {
    if (i === j) {
      return;
    }
    const t = a[i];
    a[i] = a[j];
    a[j] = t;
  }

  public removeCharacter(index: number): void {
    this._charSubs[index].unsubscribe();
    this._charSubs.splice(index, 1);

    this.characters.removeAt(index);
    this.characters.markAsDirty();
    this.characters.updateValueAndValidity();
  }

  public moveCharacterUp(index: number): void {
    if (index < 1) {
      return;
    }
    const character = this.characters.controls[index];
    this.characters.removeAt(index);
    this.characters.insert(index - 1, character);
    this.characters.markAsDirty();
    this.swapArrElems(this._charSubs, index, index - 1);
  }

  public moveCharacterDown(index: number): void {
    if (index + 1 >= this.characters.length) {
      return;
    }
    const character = this.characters.controls[index];
    this.characters.removeAt(index);
    this.characters.insert(index + 1, character);
    this.characters.markAsDirty();
    this.swapArrElems(this._charSubs, index, index + 1);
  }

  private getCharacters(): StoryCharacter[] {
    const entries: StoryCharacter[] = [];
    for (let i = 0; i < this.characters.length; i++) {
      const g = this.characters.at(i) as FormGroup;
      entries.push({
        name: g.controls.name.value?.trim(),
        sex: g.controls.sex.value?.trim(),
        role: g.controls.role.value?.trim(),
        isGroup: g.controls.isGroup.value,
      });
    }
    return entries;
  }
  //#endregion

  //#region Places
  private getPlaceGroup(item?: StoryPlace): FormGroup {
    return this._formBuilder.group({
      type: this._formBuilder.control(item?.type, [
        Validators.required,
        Validators.maxLength(50),
      ]),
      name: this._formBuilder.control(item?.name, Validators.maxLength(100)),
      location: this._formBuilder.control(
        item?.location,
        Validators.maxLength(100)
      ),
    });
  }

  public addPlace(place?: StoryPlace): void {
    const g = this.getPlaceGroup(place);
    this._placeSubs.push(
      g.valueChanges.pipe(debounceTime(300)).subscribe((_) => {
        this.form.markAsDirty();
      })
    );
    this.places.push(g);
    this.places.markAsDirty();
    this.places.updateValueAndValidity();
  }

  public removePlace(index: number): void {
    this._placeSubs[index].unsubscribe();
    this._placeSubs.splice(index, 1);

    this.places.removeAt(index);
    this.places.markAsDirty();
  }

  public movePlaceUp(index: number): void {
    if (index < 1) {
      return;
    }
    const place = this.places.controls[index];
    this.places.removeAt(index);
    this.places.insert(index - 1, place);
    this.places.markAsDirty();
    this.swapArrElems(this._placeSubs, index, index - 1);
  }

  public movePlaceDown(index: number): void {
    if (index + 1 >= this.places.length) {
      return;
    }
    const place = this.places.controls[index];
    this.places.removeAt(index);
    this.places.insert(index + 1, place);
    this.places.markAsDirty();
    this.swapArrElems(this._placeSubs, index, index + 1);
  }

  private getPlaces(): StoryPlace[] {
    const entries: StoryPlace[] = [];
    for (let i = 0; i < this.places.length; i++) {
      const g = this.places.at(i) as FormGroup;
      entries.push({
        type: g.controls.type.value?.trim(),
        name: g.controls.name.value?.trim(),
        location: g.controls.location.value?.trim(),
      });
    }
    return entries.length ? entries : [];
  }
  //#endregion
}
