import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ITypeDocument } from '../type-document.model';
import { TypeDocumentService } from '../service/type-document.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './type-document-delete-dialog.component.html',
})
export class TypeDocumentDeleteDialogComponent {
  typeDocument?: ITypeDocument;

  constructor(protected typeDocumentService: TypeDocumentService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.typeDocumentService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
