import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CadmusCoreModule, PendingChangesGuard } from '@myrmidon/cadmus-core';
import { CadmusStateModule } from '@myrmidon/cadmus-state';
import { CadmusUiModule } from '@myrmidon/cadmus-ui';
import { CadmusUiPgModule } from '@myrmidon/cadmus-ui-pg';
import { NgToolsModule } from '@myrmidon/ng-tools';
import {
  CadmusRenovellaPartUiModule,
  POETIC_TEXTS_PART_TYPEID,
  TALE_INFO_PART_TYPEID,
  TALE_STORY_PART_TYPEID,
} from '@myrmidon/cadmus-renovella-part-ui';

import { TaleInfoPartFeatureComponent } from './tale-info-part-feature/tale-info-part-feature.component';
import { TaleStoryPartFeatureComponent } from './tale-story-part-feature/tale-story-part-feature.component';
import { PoeticTextsPartFeatureComponent } from './poetic-texts-part-feature/poetic-texts-part-feature.component';

// https://github.com/ng-packagr/ng-packagr/issues/778
export const RouterModuleForChild = RouterModule.forChild([
  {
    path: `${TALE_INFO_PART_TYPEID}/:pid`,
    pathMatch: 'full',
    component: TaleInfoPartFeatureComponent,
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: `${TALE_STORY_PART_TYPEID}/:pid`,
    pathMatch: 'full',
    component: TaleStoryPartFeatureComponent,
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: `${POETIC_TEXTS_PART_TYPEID}/:pid`,
    pathMatch: 'full',
    component: PoeticTextsPartFeatureComponent,
    canDeactivate: [PendingChangesGuard],
  },
]);

@NgModule({
  declarations: [
    TaleInfoPartFeatureComponent,
    TaleStoryPartFeatureComponent,
    PoeticTextsPartFeatureComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModuleForChild,
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
    MatSnackBarModule,
    MatTabsModule,
    MatTooltipModule,
    FlexLayoutModule,
    // cadmus
    NgToolsModule,
    CadmusCoreModule,
    CadmusStateModule,
    CadmusUiModule,
    CadmusUiPgModule,
    CadmusRenovellaPartUiModule,
  ],
  exports: [
    TaleInfoPartFeatureComponent,
    TaleStoryPartFeatureComponent,
    PoeticTextsPartFeatureComponent,
  ],
})
export class CadmusRenovellaPartPgModule {}
