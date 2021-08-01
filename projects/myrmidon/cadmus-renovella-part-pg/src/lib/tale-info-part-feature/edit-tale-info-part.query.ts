import { Injectable } from '@angular/core';
import { EditPartQueryBase } from '@myrmidon/cadmus-state';
import { EditTaleInfoPartStore } from './edit-tale-info-part.store';

@Injectable({ providedIn: 'root' })
export class EditTaleInfoPartQuery extends EditPartQueryBase {
  constructor(store: EditTaleInfoPartStore) {
    super(store);
  }
}
