import { Injectable } from '@angular/core';
import { ItemService, ThesaurusService } from '@myrmidon/cadmus-api';
import { EditPartServiceBase } from '@myrmidon/cadmus-state';
import { EditPoeticTextsPartStore } from './edit-poetic-texts-part.store';

@Injectable({ providedIn: 'root' })
export class EditPoeticTextsPartService extends EditPartServiceBase {
  constructor(
    editPartStore: EditPoeticTextsPartStore,
    itemService: ItemService,
    thesaurusService: ThesaurusService
  ) {
    super(itemService, thesaurusService);
    this.store = editPartStore;
  }
}
