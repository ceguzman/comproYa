import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { TypeDocumentComponent } from '../list/type-document.component';
import { TypeDocumentDetailComponent } from '../detail/type-document-detail.component';
import { TypeDocumentUpdateComponent } from '../update/type-document-update.component';
import { TypeDocumentRoutingResolveService } from './type-document-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const typeDocumentRoute: Routes = [
  {
    path: '',
    component: TypeDocumentComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TypeDocumentDetailComponent,
    resolve: {
      typeDocument: TypeDocumentRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TypeDocumentUpdateComponent,
    resolve: {
      typeDocument: TypeDocumentRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TypeDocumentUpdateComponent,
    resolve: {
      typeDocument: TypeDocumentRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(typeDocumentRoute)],
  exports: [RouterModule],
})
export class TypeDocumentRoutingModule {}
