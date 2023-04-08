import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { TypeDocumentComponent } from './list/type-document.component';
import { TypeDocumentDetailComponent } from './detail/type-document-detail.component';
import { TypeDocumentUpdateComponent } from './update/type-document-update.component';
import { TypeDocumentDeleteDialogComponent } from './delete/type-document-delete-dialog.component';
import { TypeDocumentRoutingModule } from './route/type-document-routing.module';

@NgModule({
  imports: [SharedModule, TypeDocumentRoutingModule],
  declarations: [TypeDocumentComponent, TypeDocumentDetailComponent, TypeDocumentUpdateComponent, TypeDocumentDeleteDialogComponent],
})
export class TypeDocumentModule {}
