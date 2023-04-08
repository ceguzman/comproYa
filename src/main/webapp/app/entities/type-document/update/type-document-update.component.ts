import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { TypeDocumentFormService, TypeDocumentFormGroup } from './type-document-form.service';
import { ITypeDocument } from '../type-document.model';
import { TypeDocumentService } from '../service/type-document.service';
import { State } from 'app/entities/enumerations/state.model';

@Component({
  selector: 'jhi-type-document-update',
  templateUrl: './type-document-update.component.html',
})
export class TypeDocumentUpdateComponent implements OnInit {
  isSaving = false;
  typeDocument: ITypeDocument | null = null;
  stateValues = Object.keys(State);

  editForm: TypeDocumentFormGroup = this.typeDocumentFormService.createTypeDocumentFormGroup();

  constructor(
    protected typeDocumentService: TypeDocumentService,
    protected typeDocumentFormService: TypeDocumentFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ typeDocument }) => {
      this.typeDocument = typeDocument;
      if (typeDocument) {
        this.updateForm(typeDocument);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const typeDocument = this.typeDocumentFormService.getTypeDocument(this.editForm);
    if (typeDocument.id !== null) {
      this.subscribeToSaveResponse(this.typeDocumentService.update(typeDocument));
    } else {
      this.subscribeToSaveResponse(this.typeDocumentService.create(typeDocument));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITypeDocument>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(typeDocument: ITypeDocument): void {
    this.typeDocument = typeDocument;
    this.typeDocumentFormService.resetForm(this.editForm, typeDocument);
  }
}
