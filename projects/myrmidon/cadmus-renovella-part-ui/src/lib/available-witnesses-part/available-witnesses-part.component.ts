import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  UntypedFormBuilder,
  Validators,
  FormBuilder,
  FormGroup,
  FormArray,
  UntypedFormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';

import {
  CloseSaveButtonsComponent,
  EditedObject,
  ModelEditorComponentBase,
} from '@myrmidon/cadmus-ui';
import { ThesauriSet, ThesaurusEntry } from '@myrmidon/cadmus-core';
import { AuthJwtService } from '@myrmidon/auth-jwt-login';

import {
  AvailableWitness,
  AvailableWitnessesPart,
  AVAILABLE_WITNESSES_PART_TYPEID,
} from '../available-witnesses-part';

/**
 * AvailableWitnessesPart editor component.
 * Thesauri: apparatus-witnesses (scoped, optional).
 */
@Component({
  selector: 'renovella-available-witnesses-part',
  templateUrl: './available-witnesses-part.component.html',
  styleUrls: ['./available-witnesses-part.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    CloseSaveButtonsComponent,
  ],
})
export class AvailableWitnessesPartComponent
  extends ModelEditorComponentBase<AvailableWitnessesPart>
  implements OnInit
{
  /**
   * The witnesses entries.
   */
  public witEntries: ThesaurusEntry[] | undefined;

  public witnesses: FormArray;

  constructor(
    authService: AuthJwtService,
    private _formBuilder: UntypedFormBuilder
  ) {
    super(authService, _formBuilder);
    // form
    this.witnesses = _formBuilder.array([]);
  }

  public override ngOnInit(): void {
    super.ngOnInit();
  }

  protected buildForm(formBuilder: FormBuilder): FormGroup | UntypedFormGroup {
    return formBuilder.group({
      witnesses: this.witnesses,
    });
  }

  private updateThesauri(thesauri: ThesauriSet): void {
    const key = 'apparatus-witnesses';
    if (this.hasThesaurus(key)) {
      this.witEntries = thesauri[key].entries;
    } else {
      this.witEntries = undefined;
    }
  }

  private updateForm(part?: AvailableWitnessesPart | null): void {
    if (!part) {
      this.form?.reset();
      return;
    }
    this.witnesses.clear();
    if (part.witnesses?.length) {
      for (let w of part.witnesses) {
        this.witnesses.controls.push(this.getWitnessGroup(w));
      }
    }
    this.form.markAsPristine();
  }

  protected override onDataSet(
    data?: EditedObject<AvailableWitnessesPart>
  ): void {
    // thesauri
    if (data?.thesauri) {
      this.updateThesauri(data.thesauri);
    }

    // form
    this.updateForm(data?.value);
  }

  protected getValue(): AvailableWitnessesPart {
    let part = this.getEditedPart(
      AVAILABLE_WITNESSES_PART_TYPEID
    ) as AvailableWitnessesPart;
    part.witnesses = this.getWitnesses();
    return part;
  }

  private getWitnessGroup(witness?: AvailableWitness): FormGroup {
    const g = this._formBuilder.group({
      id: this._formBuilder.control(witness?.id, [
        Validators.required,
        Validators.maxLength(50),
      ]),
      partial: this._formBuilder.control(witness?.isPartial),
      note: this._formBuilder.control(witness?.note, Validators.maxLength(300)),
      externalIds: this._formBuilder.control(
        witness?.externalIds?.join('\n'),
        Validators.maxLength(5000)
      ),
    });
    g.valueChanges.subscribe((_) => {
      this.form?.updateValueAndValidity();
    });
    return g;
  }

  public addWitness(item?: AvailableWitness): void {
    this.witnesses.push(this.getWitnessGroup(item));
    this.form?.markAsDirty();
  }

  public removeWitness(index: number): void {
    this.witnesses.removeAt(index);
    this.form?.markAsDirty();
  }

  public moveWitnessUp(index: number): void {
    if (index < 1) {
      return;
    }
    const item = this.witnesses.controls[index];
    this.witnesses.removeAt(index);
    this.witnesses.insert(index - 1, item);
    this.form?.markAsDirty();
  }

  public moveWitnessDown(index: number): void {
    if (index + 1 >= this.witnesses.length) {
      return;
    }
    const item = this.witnesses.controls[index];
    this.witnesses.removeAt(index);
    this.witnesses.insert(index + 1, item);
    this.form?.markAsDirty();
  }

  public addAllWitnesses(): void {
    if (!this.witEntries?.length) {
      return;
    }
    const present = this.getWitnesses();
    this.witEntries.forEach((e) => {
      if (!present.find((p) => p.id === e.id)) {
        this.addWitness({
          id: e.id,
        });
      }
    });
    this.form?.markAsDirty();
  }

  private getWitnesses(): AvailableWitness[] {
    const witnesses: AvailableWitness[] = [];
    for (let i = 0; i < this.witnesses.length; i++) {
      const g = this.witnesses.at(i) as FormGroup;
      witnesses.push({
        id: g.controls['id'].value?.trim(),
        isPartial: g.controls['partial'].value ? true : undefined,
        note: g.controls['note'].value?.trim(),
        externalIds: g.controls['externalIds'].value?.split('\n'),
      });
    }
    return witnesses;
  }
}
