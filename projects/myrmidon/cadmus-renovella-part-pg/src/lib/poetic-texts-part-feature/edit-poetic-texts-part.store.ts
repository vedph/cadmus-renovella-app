import { Injectable } from '@angular/core';
import { StoreConfig, Store } from '@datorama/akita';
import { POETIC_TEXTS_PART_TYPEID } from '@myrmidon/cadmus-renovella-part-ui';

import { EditPartState, EditPartStoreApi } from '@myrmidon/cadmus-state';

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: POETIC_TEXTS_PART_TYPEID })
export class EditPoeticTextsPartStore
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
