import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  Validators,
  FormArray,
  FormBuilder,
  FormGroup,
  UntypedFormGroup,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { NgToolsValidators } from '@myrmidon/ng-tools';
import { AuthJwtService } from '@myrmidon/auth-jwt-login';
import { EditedObject, ModelEditorComponentBase } from '@myrmidon/cadmus-ui';
import { ThesauriSet, ThesaurusEntry } from '@myrmidon/cadmus-core';
import { HistoricalDateModel } from '@myrmidon/cadmus-refs-historical-date';

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
  standalone: false,
})
export class TaleStoryPartComponent
  extends ModelEditorComponentBase<TaleStoryPart>
  implements OnInit, OnDestroy
{
  private _charSubs: Subscription[];
  private _placeSubs: Subscription[];

  public summary: FormControl<string>;
  public prologue: FormControl<string | null>;
  public epilogue: FormControl<string | null>;
  public age: FormControl<string | null>;
  public hasDate: FormControl<boolean>;
  public date: FormControl<HistoricalDateModel | null>;
  public places: FormArray;
  public characters: FormArray;

  // story-roles
  public storyRoleEntries: ThesaurusEntry[] | undefined;
  // story-place-types
  public storyPlaceTypeEntries: ThesaurusEntry[] | undefined;
  // story-ages
  public storyAgeEntries: ThesaurusEntry[] | undefined;

  constructor(authService: AuthJwtService, private _formBuilder: FormBuilder) {
    super(authService, _formBuilder);
    this._charSubs = [];
    this._placeSubs = [];
    // form
    this.summary = _formBuilder.control('', {
      validators: [Validators.required, Validators.maxLength(5000)],
      nonNullable: true,
    });
    this.prologue = _formBuilder.control(null, Validators.maxLength(1000));
    this.epilogue = _formBuilder.control(null, Validators.maxLength(1000));
    this.characters = _formBuilder.array(
      [],
      NgToolsValidators.strictMinLengthValidator(1)
    );
    this.age = _formBuilder.control(null);
    this.hasDate = _formBuilder.control(false, { nonNullable: true });
    this.date = _formBuilder.control(
      null,
      NgToolsValidators.conditionalValidator(
        () => this.hasDate.value,
        Validators.required
      )
    );
    this.places = _formBuilder.array(
      [],
      NgToolsValidators.strictMinLengthValidator(1)
    );
  }

  public ngOnInit(): void {
    super.ngOnInit();
  }

  protected buildForm(formBuilder: FormBuilder): FormGroup | UntypedFormGroup {
    return formBuilder.group({
      summary: this.summary,
      prologue: this.prologue,
      epilogue: this.epilogue,
      characters: this.characters,
      age: this.age,
      hasDate: this.hasDate,
      date: this.date,
      places: this.places,
    });
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

  private updateForm(part?: TaleStoryPart | null): void {
    this.unsubscribeChars();
    this.unsubscribePlaces();
    if (!part) {
      this.form.reset();
      return;
    }
    this.summary.setValue(part.summary);
    this.prologue.setValue(part.prologue || null);
    this.epilogue.setValue(part.epilogue || null);
    this.characters.clear({ emitEvent: false });
    if (part.characters) {
      for (let c of part.characters) {
        this.addCharacter(c);
      }
    }
    this.age.setValue(part.age || null);
    this.hasDate.setValue(part.date ? true : false);
    this.date.setValue(part.date || null);
    this.places.clear({ emitEvent: false });
    if (part.places) {
      for (let p of part.places) {
        this.addPlace(p);
      }
    }

    this.form.markAsPristine();
  }

  protected override onDataSet(data?: EditedObject<TaleStoryPart>): void {
    // thesauri
    if (data?.thesauri) {
      this.updateThesauri(data.thesauri);
    }

    // form
    this.updateForm(data?.value);
  }

  private updateThesauri(thesauri: ThesauriSet): void {
    let key = 'story-roles';
    if (this.hasThesaurus(key)) {
      this.storyRoleEntries = thesauri[key].entries;
    } else {
      this.storyRoleEntries = undefined;
    }

    key = 'story-place-types';
    if (this.hasThesaurus(key)) {
      this.storyPlaceTypeEntries = thesauri[key].entries;
    } else {
      this.storyPlaceTypeEntries = undefined;
    }

    key = 'story-ages';
    if (this.hasThesaurus(key)) {
      this.storyAgeEntries = thesauri[key].entries;
    } else {
      this.storyAgeEntries = undefined;
    }
  }

  protected getValue(): TaleStoryPart {
    let part = this.getEditedPart(TALE_STORY_PART_TYPEID) as TaleStoryPart;
    part.summary = this.summary.value?.trim();
    part.prologue = this.prologue.value?.trim();
    part.epilogue = this.epilogue.value?.trim();
    part.characters = this.getCharacters();
    part.age = this.age.value?.trim();
    part.date = this.hasDate.value ? this.date.value || undefined : undefined;
    part.places = this.getPlaces();

    return part;
  }

  public onDateChange(date: HistoricalDateModel): void {
    this.date.setValue(date);
    this.date.updateValueAndValidity();
    this.date.markAsDirty();
  }

  //#region Characters
  private getCharacterGroup(character?: StoryCharacter): UntypedFormGroup {
    return this._formBuilder.group({
      name: this._formBuilder.control(
        character?.name,
        Validators.maxLength(100)
      ),
      sex: this._formBuilder.control(character?.sex),
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
        this.form?.markAsDirty();
      })
    );
    this.characters.push(g);
    this.characters.updateValueAndValidity();
    this.characters.markAsDirty();
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
    this.characters.updateValueAndValidity();
    this.characters.markAsDirty();
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
      const g = this.characters.at(i) as UntypedFormGroup;
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
  private getPlaceGroup(item?: StoryPlace): UntypedFormGroup {
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
        this.form?.markAsDirty();
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
      const g = this.places.at(i) as UntypedFormGroup;
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
