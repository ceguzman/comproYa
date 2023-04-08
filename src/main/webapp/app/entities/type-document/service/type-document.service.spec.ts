import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ITypeDocument } from '../type-document.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../type-document.test-samples';

import { TypeDocumentService } from './type-document.service';

const requireRestSample: ITypeDocument = {
  ...sampleWithRequiredData,
};

describe('TypeDocument Service', () => {
  let service: TypeDocumentService;
  let httpMock: HttpTestingController;
  let expectedResult: ITypeDocument | ITypeDocument[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(TypeDocumentService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a TypeDocument', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const typeDocument = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(typeDocument).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a TypeDocument', () => {
      const typeDocument = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(typeDocument).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a TypeDocument', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of TypeDocument', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a TypeDocument', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addTypeDocumentToCollectionIfMissing', () => {
      it('should add a TypeDocument to an empty array', () => {
        const typeDocument: ITypeDocument = sampleWithRequiredData;
        expectedResult = service.addTypeDocumentToCollectionIfMissing([], typeDocument);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(typeDocument);
      });

      it('should not add a TypeDocument to an array that contains it', () => {
        const typeDocument: ITypeDocument = sampleWithRequiredData;
        const typeDocumentCollection: ITypeDocument[] = [
          {
            ...typeDocument,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addTypeDocumentToCollectionIfMissing(typeDocumentCollection, typeDocument);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a TypeDocument to an array that doesn't contain it", () => {
        const typeDocument: ITypeDocument = sampleWithRequiredData;
        const typeDocumentCollection: ITypeDocument[] = [sampleWithPartialData];
        expectedResult = service.addTypeDocumentToCollectionIfMissing(typeDocumentCollection, typeDocument);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(typeDocument);
      });

      it('should add only unique TypeDocument to an array', () => {
        const typeDocumentArray: ITypeDocument[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const typeDocumentCollection: ITypeDocument[] = [sampleWithRequiredData];
        expectedResult = service.addTypeDocumentToCollectionIfMissing(typeDocumentCollection, ...typeDocumentArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const typeDocument: ITypeDocument = sampleWithRequiredData;
        const typeDocument2: ITypeDocument = sampleWithPartialData;
        expectedResult = service.addTypeDocumentToCollectionIfMissing([], typeDocument, typeDocument2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(typeDocument);
        expect(expectedResult).toContain(typeDocument2);
      });

      it('should accept null and undefined values', () => {
        const typeDocument: ITypeDocument = sampleWithRequiredData;
        expectedResult = service.addTypeDocumentToCollectionIfMissing([], null, typeDocument, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(typeDocument);
      });

      it('should return initial array if no TypeDocument is added', () => {
        const typeDocumentCollection: ITypeDocument[] = [sampleWithRequiredData];
        expectedResult = service.addTypeDocumentToCollectionIfMissing(typeDocumentCollection, undefined, null);
        expect(expectedResult).toEqual(typeDocumentCollection);
      });
    });

    describe('compareTypeDocument', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareTypeDocument(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareTypeDocument(entity1, entity2);
        const compareResult2 = service.compareTypeDocument(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareTypeDocument(entity1, entity2);
        const compareResult2 = service.compareTypeDocument(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareTypeDocument(entity1, entity2);
        const compareResult2 = service.compareTypeDocument(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
