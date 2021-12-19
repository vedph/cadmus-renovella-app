import { Injectable } from '@angular/core';
import { StoreConfig, Store } from '@datorama/akita';

import { EditPartState, EditPartStoreApi } from '@myrmidon/cadmus-state';

import { TALE_STORY_PART_TYPEID } from '@myrmidon/cadmus-renovella-part-ui';

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: TALE_STORY_PART_TYPEID })
export class EditTaleStoryPartStore
  extends Store<EditPartState>
  implements EditPartStoreApi
{
  constructor() {
    super({});
  }

  public setDirty(value: boolean): void {
    this.update({ dirty: value });
  }
  public setSaving(value: boolean): void {
    this.update({ saving: value });
  }
}
