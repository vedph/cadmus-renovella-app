import { Injectable } from '@angular/core';
import { ItemService, ThesaurusService } from '@myrmidon/cadmus-api';
import { EditPartServiceBase } from '@myrmidon/cadmus-state';
import { EditTaleStoryPartStore } from './edit-tale-story-part.store';

@Injectable({ providedIn: 'root' })
export class EditTaleStoryPartService extends EditPartServiceBase {
  constructor(
    editPartStore: EditTaleStoryPartStore,
    itemService: ItemService,
    thesaurusService: ThesaurusService
  ) {
    super(itemService, thesaurusService);
    this.store = editPartStore;
  }
}
