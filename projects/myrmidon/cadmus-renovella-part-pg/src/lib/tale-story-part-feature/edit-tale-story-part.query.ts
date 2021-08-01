import { Injectable } from '@angular/core';
import { EditPartQueryBase } from '@myrmidon/cadmus-state';
import { EditTaleStoryPartStore } from './edit-tale-story-part.store';

@Injectable({ providedIn: 'root' })
export class EditTaleStoryPartQuery extends EditPartQueryBase {
  constructor(store: EditTaleStoryPartStore) {
    super(store);
  }
}
