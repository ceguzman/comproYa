import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../sale.test-samples';

import { SaleFormService } from './sale-form.service';

describe('Sale Form Service', () => {
  let service: SaleFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaleFormService);
  });

  describe('Service methods', () => {
    describe('createSaleFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createSaleFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            codeProduct: expect.any(Object),
            nameProduct: expect.any(Object),
            date: expect.any(Object),
            customer: expect.any(Object),
          })
        );
      });

      it('passing ISale should create a new form with FormGroup', () => {
        const formGroup = service.createSaleFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            codeProduct: expect.any(Object),
            nameProduct: expect.any(Object),
            date: expect.any(Object),
            customer: expect.any(Object),
          })
        );
      });
    });

    describe('getSale', () => {
      it('should return NewSale for default Sale initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createSaleFormGroup(sampleWithNewData);

        const sale = service.getSale(formGroup) as any;

        expect(sale).toMatchObject(sampleWithNewData);
      });

      it('should return NewSale for empty Sale initial value', () => {
        const formGroup = service.createSaleFormGroup();

        const sale = service.getSale(formGroup) as any;

        expect(sale).toMatchObject({});
      });

      it('should return ISale', () => {
        const formGroup = service.createSaleFormGroup(sampleWithRequiredData);

        const sale = service.getSale(formGroup) as any;

        expect(sale).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ISale should not enable id FormControl', () => {
        const formGroup = service.createSaleFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewSale should disable id FormControl', () => {
        const formGroup = service.createSaleFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
