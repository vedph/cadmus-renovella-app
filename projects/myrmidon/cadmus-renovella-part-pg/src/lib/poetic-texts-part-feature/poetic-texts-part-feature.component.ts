import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ThesauriSet } from '@myrmidon/cadmus-core';
import {
  EditItemQuery,
  EditItemService,
  EditPartFeatureBase,
} from '@myrmidon/cadmus-state';
import { EditPoeticTextsPartQuery } from './edit-poetic-texts-part.query';
import { EditPoeticTextsPartService } from './edit-poetic-texts-part.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'renovella-poetic-texts-part-feature',
  templateUrl: './poetic-texts-part-feature.component.html',
  styleUrls: ['./poetic-texts-part-feature.component.css'],
})
export class PoeticTextsPartFeatureComponent
  extends EditPartFeatureBase
  implements OnInit
{
  constructor(
    router: Router,
    route: ActivatedRoute,
    snackbar: MatSnackBar,
    editPartQuery: EditPoeticTextsPartQuery,
    editPartService: EditPoeticTextsPartService,
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
    this.initEditor(['poetic-text-metres']);
  }
}
