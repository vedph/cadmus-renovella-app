import { Injectable } from '@angular/core';
import { ItemService, ThesaurusService } from '@myrmidon/cadmus-api';
import { EditPartServiceBase } from '@myrmidon/cadmus-state';
import { EditTaleInfoPartStore } from './edit-tale-info-part.store';

@Injectable({ providedIn: 'root' })
export class EditTaleInfoPartService extends EditPartServiceBase {
  constructor(
    editPartStore: EditTaleInfoPartStore,
    itemService: ItemService,
    thesaurusService: ThesaurusService
  ) {
    super(itemService, thesaurusService);
    this.store = editPartStore;
  }
}
