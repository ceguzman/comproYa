import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITypeDocument } from '../type-document.model';

@Component({
  selector: 'jhi-type-document-detail',
  templateUrl: './type-document-detail.component.html',
})
export class TypeDocumentDetailComponent implements OnInit {
  typeDocument: ITypeDocument | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ typeDocument }) => {
      this.typeDocument = typeDocument;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
