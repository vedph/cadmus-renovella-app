import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CadmusCoreModule } from '@myrmidon/cadmus-core';
import { CadmusMaterialModule } from '@myrmidon/cadmus-material';
import { CadmusRefsDecoratedIdsModule } from '@myrmidon/cadmus-refs-decorated-ids';
import { CadmusRefsDocReferencesModule } from '@myrmidon/cadmus-refs-doc-references';
import { CadmusRefsProperNameModule } from '@myrmidon/cadmus-refs-proper-name';
import { CadmusUiModule } from '@myrmidon/cadmus-ui';

import { CitedPersonComponent } from './cited-person/cited-person.component';
import { TaleInfoPartComponent } from './tale-info-part/tale-info-part.component';
import { TaleStoryPartComponent } from './tale-story-part/tale-story-part.component';

@NgModule({
  declarations: [
    CitedPersonComponent,
    TaleInfoPartComponent,
    TaleStoryPartComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // Cadmus
    CadmusCoreModule,
    CadmusUiModule,
    CadmusMaterialModule,
    CadmusUiModule,
    CadmusRefsDocReferencesModule,
    CadmusRefsProperNameModule,
    CadmusRefsDecoratedIdsModule
  ],
  exports: [
    CitedPersonComponent,
    TaleInfoPartComponent,
    TaleStoryPartComponent,
  ],
})
export class CadmusRenovellaPartUiModule {}
