import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CadmusCoreModule, PendingChangesGuard } from '@myrmidon/cadmus-core';
import { CadmusMaterialModule } from '@myrmidon/cadmus-material';
import {
  CadmusRenovellaPartUiModule,
  TALE_INFO_PART_TYPEID,
  TALE_STORY_PART_TYPEID,
} from '@myrmidon/cadmus-renovella-part-ui';
import { CadmusStateModule } from '@myrmidon/cadmus-state';
import { CadmusUiModule } from '@myrmidon/cadmus-ui';
import { CadmusUiPgModule } from '@myrmidon/cadmus-ui-pg';
import { NgToolsModule } from '@myrmidon/ng-tools';

import { TaleInfoPartFeatureComponent } from './tale-info-part-feature/tale-info-part-feature.component';
import { TaleStoryPartFeatureComponent } from './tale-story-part-feature/tale-story-part-feature.component';

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
]);

@NgModule({
  declarations: [TaleInfoPartFeatureComponent, TaleStoryPartFeatureComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModuleForChild,
    // cadmus
    NgToolsModule,
    CadmusCoreModule,
    CadmusMaterialModule,
    CadmusStateModule,
    CadmusUiModule,
    CadmusUiPgModule,
    CadmusRenovellaPartUiModule,
  ],
  exports: [TaleInfoPartFeatureComponent, TaleStoryPartFeatureComponent],
})
export class CadmusRenovellaPartPgModule {}
