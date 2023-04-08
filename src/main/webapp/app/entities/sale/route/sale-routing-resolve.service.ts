import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ISale } from '../sale.model';
import { SaleService } from '../service/sale.service';

@Injectable({ providedIn: 'root' })
export class SaleRoutingResolveService implements Resolve<ISale | null> {
  constructor(protected service: SaleService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISale | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((sale: HttpResponse<ISale>) => {
          if (sale.body) {
            return of(sale.body);
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
