import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { EditPartFeatureBase, PartEditorService } from '@myrmidon/cadmus-state';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ItemService, ThesaurusService } from '@myrmidon/cadmus-api';

@Component({
  selector: 'renovella-poetic-texts-part-feature',
  templateUrl: './poetic-texts-part-feature.component.html',
  styleUrls: ['./poetic-texts-part-feature.component.css'],
  standalone: false,
})
export class PoeticTextsPartFeatureComponent
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
    return ['poetic-text-metres'];
  }
}
