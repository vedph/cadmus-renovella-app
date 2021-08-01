import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  EditItemQuery,
  EditItemService,
  EditPartFeatureBase,
} from '@myrmidon/cadmus-state';

import { EditTaleInfoPartService } from './edit-tale-info-part.service';
import { EditTaleInfoPartQuery } from './edit-tale-info-part.query';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'renovella-tale-info-part-feature',
  templateUrl: './tale-info-part-feature.component.html',
  styleUrls: ['./tale-info-part-feature.component.css'],
})
export class TaleInfoPartFeatureComponent
  extends EditPartFeatureBase
  implements OnInit
{
  constructor(
    router: Router,
    route: ActivatedRoute,
    snackbar: MatSnackBar,
    editPartQuery: EditTaleInfoPartQuery,
    editPartService: EditTaleInfoPartService,
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
    this.initEditor([
      'tale-languages',
      'tale-genres',
      'name-part-type-entries',
    ]);
  }
}
