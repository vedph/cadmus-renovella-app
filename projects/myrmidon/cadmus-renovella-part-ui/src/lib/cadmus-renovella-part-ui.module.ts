import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';

import { CadmusCoreModule } from '@myrmidon/cadmus-core';
import { CadmusRefsDecoratedIdsModule } from '@myrmidon/cadmus-refs-decorated-ids';
import { CadmusRefsDocReferencesModule } from '@myrmidon/cadmus-refs-doc-references';
import { CadmusRefsHistoricalDateModule } from '@myrmidon/cadmus-refs-historical-date';
import { CadmusRefsProperNameModule } from '@myrmidon/cadmus-refs-proper-name';
import { CadmusUiFlagsPickerModule } from '@myrmidon/cadmus-ui-flags-picker';
import { CadmusUiModule } from '@myrmidon/cadmus-ui';
import { NgToolsModule } from '@myrmidon/ng-tools';

import { AvailableWitnessesPartComponent } from './available-witnesses-part/available-witnesses-part.component';
import { CitedPersonComponent } from './cited-person/cited-person.component';
import { TaleInfoPartComponent } from './tale-info-part/tale-info-part.component';
import { TaleStoryPartComponent } from './tale-story-part/tale-story-part.component';
import { PoeticTextsPartComponent } from './poetic-texts-part/poetic-texts-part.component';
import { PoeticTextComponent } from './poetic-text/poetic-text.component';

@NgModule({
  declarations: [
    AvailableWitnessesPartComponent,
    CitedPersonComponent,
    TaleInfoPartComponent,
    TaleStoryPartComponent,
    PoeticTextsPartComponent,
    PoeticTextComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // material
    MatAutocompleteModule,
    MatCardModule,
    MatCheckboxModule,
    MatButtonModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatTooltipModule,
    // cadmus
    NgToolsModule,
    CadmusCoreModule,
    CadmusUiModule,
    CadmusUiModule,
    CadmusRefsHistoricalDateModule,
    CadmusRefsDocReferencesModule,
    CadmusRefsProperNameModule,
    CadmusRefsDecoratedIdsModule,
    CadmusUiFlagsPickerModule,
  ],
  exports: [
    AvailableWitnessesPartComponent,
    CitedPersonComponent,
    TaleInfoPartComponent,
    TaleStoryPartComponent,
    PoeticTextsPartComponent,
  ],
})
export class CadmusRenovellaPartUiModule {}
