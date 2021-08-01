import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  EditItemQuery,
  EditItemService,
  EditPartFeatureBase,
} from '@myrmidon/cadmus-state';

import { EditTaleStoryPartService } from './edit-tale-story-part.service';
import { EditTaleStoryPartQuery } from './edit-tale-story-part.query';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'renovella-tale-story-part-feature',
  templateUrl: './tale-story-part-feature.component.html',
  styleUrls: ['./tale-story-part-feature.component.css'],
})
export class TaleStoryPartFeatureComponent
  extends EditPartFeatureBase
  implements OnInit
{
  constructor(
    router: Router,
    route: ActivatedRoute,
    snackbar: MatSnackBar,
    editPartQuery: EditTaleStoryPartQuery,
    editPartService: EditTaleStoryPartService,
    editItemQuery: EditItemQuery,
    editItemService: EditItemService
  ) {
    super(
      router,
      route,
      snackbar,
      editPartQuery,
      editPartService,
      editItemQuery,
      editItemService
    );
  }

  public ngOnInit(): void {
    this.initEditor(['story-roles', 'story-place-types', 'story-ages']);
  }
}
