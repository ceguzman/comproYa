import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { CustomerFormService, CustomerFormGroup } from './customer-form.service';
import { ICustomer } from '../customer.model';
import { CustomerService } from '../service/customer.service';
import { ITypeDocument } from 'app/entities/type-document/type-document.model';
import { TypeDocumentService } from 'app/entities/type-document/service/type-document.service';

@Component({
  selector: 'jhi-customer-update',
  templateUrl: './customer-update.component.html',
})
export class CustomerUpdateComponent implements OnInit {
  isSaving = false;
  customer: ICustomer | null = null;

  typeDocumentsSharedCollection: ITypeDocument[] = [];

  editForm: CustomerFormGroup = this.customerFormService.createCustomerFormGroup();

  constructor(
    protected customerService: CustomerService,
    protected customerFormService: CustomerFormService,
    protected typeDocumentService: TypeDocumentService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareTypeDocument = (o1: ITypeDocument | null, o2: ITypeDocument | null): boolean =>
    this.typeDocumentService.compareTypeDocument(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ customer }) => {
      this.customer = customer;
      if (customer) {
        this.updateForm(customer);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const customer = this.customerFormService.getCustomer(this.editForm);
    if (customer.id !== null) {
      this.subscribeToSaveResponse(this.customerService.update(customer));
    } else {
      this.subscribeToSaveResponse(this.customerService.create(customer));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICustomer>>): void {
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

  protected updateForm(customer: ICustomer): void {
    this.customer = customer;
    this.customerFormService.resetForm(this.editForm, customer);

    this.typeDocumentsSharedCollection = this.typeDocumentService.addTypeDocumentToCollectionIfMissing<ITypeDocument>(
      this.typeDocumentsSharedCollection,
      customer.typeDocument
    );
  }

  protected loadRelationshipsOptions(): void {
    this.typeDocumentService
      .query()
      .pipe(map((res: HttpResponse<ITypeDocument[]>) => res.body ?? []))
      .pipe(
        map((typeDocuments: ITypeDocument[]) =>
          this.typeDocumentService.addTypeDocumentToCollectionIfMissing<ITypeDocument>(typeDocuments, this.customer?.typeDocument)
        )
      )
      .subscribe((typeDocuments: ITypeDocument[]) => (this.typeDocumentsSharedCollection = typeDocuments));
  }
}
