import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITypeDocument } from '../type-document.model';
import { TypeDocumentService } from '../service/type-document.service';

@Injectable({ providedIn: 'root' })
export class TypeDocumentRoutingResolveService implements Resolve<ITypeDocument | null> {
  constructor(protected service: TypeDocumentService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITypeDocument | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((typeDocument: HttpResponse<ITypeDocument>) => {
          if (typeDocument.body) {
            return of(typeDocument.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(null);
  }
}
