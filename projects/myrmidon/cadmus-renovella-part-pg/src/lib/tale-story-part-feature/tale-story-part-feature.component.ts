import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { EditPartFeatureBase, PartEditorService } from '@myrmidon/cadmus-state';
import { ItemService, ThesaurusService } from '@myrmidon/cadmus-api';
import { CurrentItemBarComponent } from '@myrmidon/cadmus-ui-pg';

import { TaleStoryPartComponent } from '@myrmidon/cadmus-renovella-part-ui';

@Component({
  selector: 'renovella-tale-story-part-feature',
  templateUrl: './tale-story-part-feature.component.html',
  styleUrls: ['./tale-story-part-feature.component.css'],
  imports: [CurrentItemBarComponent, TaleStoryPartComponent],
})
export class TaleStoryPartFeatureComponent
  extends EditPartFeatureBase
  implements OnInit
{
  constructor(
    router: Router,
    route: ActivatedRoute,
    snackbar: MatSnackBar,
    itemService: ItemService,
    thesaurusService: ThesaurusService,
    editorService: PartEditorService
  ) {
    super(
      router,
      route,
      snackbar,
      itemService,
      thesaurusService,
      editorService
    );
  }

  protected override getReqThesauriIds(): string[] {
    return ['story-roles', 'story-place-types', 'story-ages'];
  }
}
