import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../type-document.test-samples';

import { TypeDocumentFormService } from './type-document-form.service';

describe('TypeDocument Form Service', () => {
  let service: TypeDocumentFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeDocumentFormService);
  });

  describe('Service methods', () => {
    describe('createTypeDocumentFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createTypeDocumentFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            initials: expect.any(Object),
            documentName: expect.any(Object),
            stateTypeDocument: expect.any(Object),
          })
        );
      });

      it('passing ITypeDocument should create a new form with FormGroup', () => {
        const formGroup = service.createTypeDocumentFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            initials: expect.any(Object),
            documentName: expect.any(Object),
            stateTypeDocument: expect.any(Object),
          })
        );
      });
    });

    describe('getTypeDocument', () => {
      it('should return NewTypeDocument for default TypeDocument initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createTypeDocumentFormGroup(sampleWithNewData);

        const typeDocument = service.getTypeDocument(formGroup) as any;

        expect(typeDocument).toMatchObject(sampleWithNewData);
      });

      it('should return NewTypeDocument for empty TypeDocument initial value', () => {
        const formGroup = service.createTypeDocumentFormGroup();

        const typeDocument = service.getTypeDocument(formGroup) as any;

        expect(typeDocument).toMatchObject({});
      });

      it('should return ITypeDocument', () => {
        const formGroup = service.createTypeDocumentFormGroup(sampleWithRequiredData);

        const typeDocument = service.getTypeDocument(formGroup) as any;

        expect(typeDocument).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ITypeDocument should not enable id FormControl', () => {
        const formGroup = service.createTypeDocumentFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewTypeDocument should disable id FormControl', () => {
        const formGroup = service.createTypeDocumentFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
