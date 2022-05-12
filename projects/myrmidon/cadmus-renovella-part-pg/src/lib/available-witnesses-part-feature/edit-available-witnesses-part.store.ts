import { Injectable } from '@angular/core';
import { StoreConfig, Store } from '@datorama/akita';

import { EditPartState, EditPartStoreApi } from '@myrmidon/cadmus-state';

import { AVAILABLE_WITNESSES_PART_TYPEID } from '@myrmidon/cadmus-renovella-part-ui';

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: AVAILABLE_WITNESSES_PART_TYPEID })
export class EditAvailableWitnessesPartStore
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
