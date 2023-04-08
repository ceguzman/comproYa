import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ISale, NewSale } from '../sale.model';

export type PartialUpdateSale = Partial<ISale> & Pick<ISale, 'id'>;

type RestOf<T extends ISale | NewSale> = Omit<T, 'date'> & {
  date?: string | null;
};

export type RestSale = RestOf<ISale>;

export type NewRestSale = RestOf<NewSale>;

export type PartialUpdateRestSale = RestOf<PartialUpdateSale>;

export type EntityResponseType = HttpResponse<ISale>;
export type EntityArrayResponseType = HttpResponse<ISale[]>;

@Injectable({ providedIn: 'root' })
export class SaleService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/sales');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(sale: NewSale): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(sale);
    return this.http.post<RestSale>(this.resourceUrl, copy, { observe: 'response' }).pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(sale: ISale): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(sale);
    return this.http
      .put<RestSale>(`${this.resourceUrl}/${this.getSaleIdentifier(sale)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(sale: PartialUpdateSale): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(sale);
    return this.http
      .patch<RestSale>(`${this.resourceUrl}/${this.getSaleIdentifier(sale)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestSale>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestSale[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getSaleIdentifier(sale: Pick<ISale, 'id'>): number {
    return sale.id;
  }

  compareSale(o1: Pick<ISale, 'id'> | null, o2: Pick<ISale, 'id'> | null): boolean {
    return o1 && o2 ? this.getSaleIdentifier(o1) === this.getSaleIdentifier(o2) : o1 === o2;
  }

  addSaleToCollectionIfMissing<Type extends Pick<ISale, 'id'>>(
    saleCollection: Type[],
    ...salesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const sales: Type[] = salesToCheck.filter(isPresent);
    if (sales.length > 0) {
      const saleCollectionIdentifiers = saleCollection.map(saleItem => this.getSaleIdentifier(saleItem)!);
      const salesToAdd = sales.filter(saleItem => {
        const saleIdentifier = this.getSaleIdentifier(saleItem);
        if (saleCollectionIdentifiers.includes(saleIdentifier)) {
          return false;
        }
        saleCollectionIdentifiers.push(saleIdentifier);
        return true;
      });
      return [...salesToAdd, ...saleCollection];
    }
    return saleCollection;
  }

  protected convertDateFromClient<T extends ISale | NewSale | PartialUpdateSale>(sale: T): RestOf<T> {
    return {
      ...sale,
      date: sale.date?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restSale: RestSale): ISale {
    return {
      ...restSale,
      date: restSale.date ? dayjs(restSale.date) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestSale>): HttpResponse<ISale> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestSale[]>): HttpResponse<ISale[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
