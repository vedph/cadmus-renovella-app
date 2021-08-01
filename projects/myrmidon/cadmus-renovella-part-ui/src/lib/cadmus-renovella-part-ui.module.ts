import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CadmusCoreModule } from '@myrmidon/cadmus-core';

// general Cadmus modules
import { CadmusMaterialModule } from '@myrmidon/cadmus-material';
import { CadmusProsopaCitedPersonModule } from '@myrmidon/cadmus-prosopa-cited-person';
import { CadmusProsopaPersonNameModule } from '@myrmidon/cadmus-prosopa-person-name';
import { CadmusUiModule } from '@myrmidon/cadmus-ui';
import { TaleInfoPartComponent } from './tale-info-part/tale-info-part.component';
import { TaleStoryPartComponent } from './tale-story-part/tale-story-part.component';

@NgModule({
  declarations: [TaleInfoPartComponent, TaleStoryPartComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // Cadmus
    CadmusCoreModule,
    CadmusUiModule,
    CadmusMaterialModule,
    CadmusUiModule,
    CadmusProsopaPersonNameModule,
    CadmusProsopaCitedPersonModule
  ],
  exports: [TaleInfoPartComponent, TaleStoryPartComponent],
})
export class CadmusRenovellaPartUiModule {}
