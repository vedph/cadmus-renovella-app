import { Injectable } from '@angular/core';
import { EditPartQueryBase } from '@myrmidon/cadmus-state';
import { EditPoeticTextsPartStore } from './edit-poetic-texts-part.store';

@Injectable({ providedIn: 'root' })
export class EditPoeticTextsPartQuery extends EditPartQueryBase {
  constructor(store: EditPoeticTextsPartStore) {
    super(store);
  }
}
