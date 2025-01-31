import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { EditPartFeatureBase, PartEditorService } from '@myrmidon/cadmus-state';
import { ItemService, ThesaurusService } from '@myrmidon/cadmus-api';
import { TaleInfoPartComponent } from '@myrmidon/cadmus-renovella-part-ui';
import { CurrentItemBarComponent } from '@myrmidon/cadmus-ui-pg';

@Component({
  selector: 'renovella-tale-info-part-feature',
  templateUrl: './tale-info-part-feature.component.html',
  styleUrls: ['./tale-info-part-feature.component.css'],
  imports: [CurrentItemBarComponent, TaleInfoPartComponent],
})
export class TaleInfoPartFeatureComponent
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
    return ['tale-languages', 'tale-genres', 'name-part-type-entries'];
  }
}
