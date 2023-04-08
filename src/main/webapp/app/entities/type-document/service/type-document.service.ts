import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITypeDocument, NewTypeDocument } from '../type-document.model';

export type PartialUpdateTypeDocument = Partial<ITypeDocument> & Pick<ITypeDocument, 'id'>;

export type EntityResponseType = HttpResponse<ITypeDocument>;
export type EntityArrayResponseType = HttpResponse<ITypeDocument[]>;

@Injectable({ providedIn: 'root' })
export class TypeDocumentService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/type-documents');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(typeDocument: NewTypeDocument): Observable<EntityResponseType> {
    return this.http.post<ITypeDocument>(this.resourceUrl, typeDocument, { observe: 'response' });
  }

  update(typeDocument: ITypeDocument): Observable<EntityResponseType> {
    return this.http.put<ITypeDocument>(`${this.resourceUrl}/${this.getTypeDocumentIdentifier(typeDocument)}`, typeDocument, {
      observe: 'response',
    });
  }

  partialUpdate(typeDocument: PartialUpdateTypeDocument): Observable<EntityResponseType> {
    return this.http.patch<ITypeDocument>(`${this.resourceUrl}/${this.getTypeDocumentIdentifier(typeDocument)}`, typeDocument, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITypeDocument>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITypeDocument[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getTypeDocumentIdentifier(typeDocument: Pick<ITypeDocument, 'id'>): number {
    return typeDocument.id;
  }

  compareTypeDocument(o1: Pick<ITypeDocument, 'id'> | null, o2: Pick<ITypeDocument, 'id'> | null): boolean {
    return o1 && o2 ? this.getTypeDocumentIdentifier(o1) === this.getTypeDocumentIdentifier(o2) : o1 === o2;
  }

  addTypeDocumentToCollectionIfMissing<Type extends Pick<ITypeDocument, 'id'>>(
    typeDocumentCollection: Type[],
    ...typeDocumentsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const typeDocuments: Type[] = typeDocumentsToCheck.filter(isPresent);
    if (typeDocuments.length > 0) {
      const typeDocumentCollectionIdentifiers = typeDocumentCollection.map(
        typeDocumentItem => this.getTypeDocumentIdentifier(typeDocumentItem)!
      );
      const typeDocumentsToAdd = typeDocuments.filter(typeDocumentItem => {
        const typeDocumentIdentifier = this.getTypeDocumentIdentifier(typeDocumentItem);
        if (typeDocumentCollectionIdentifiers.includes(typeDocumentIdentifier)) {
          return false;
        }
        typeDocumentCollectionIdentifiers.push(typeDocumentIdentifier);
        return true;
      });
      return [...typeDocumentsToAdd, ...typeDocumentCollection];
    }
    return typeDocumentCollection;
  }
}
