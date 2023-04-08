import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ISale, NewSale } from '../sale.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ISale for edit and NewSaleFormGroupInput for create.
 */
type SaleFormGroupInput = ISale | PartialWithRequiredKeyOf<NewSale>;

type SaleFormDefaults = Pick<NewSale, 'id'>;

type SaleFormGroupContent = {
  id: FormControl<ISale['id'] | NewSale['id']>;
  codeProduct: FormControl<ISale['codeProduct']>;
  nameProduct: FormControl<ISale['nameProduct']>;
  date: FormControl<ISale['date']>;
  customer: FormControl<ISale['customer']>;
};

export type SaleFormGroup = FormGroup<SaleFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class SaleFormService {
  createSaleFormGroup(sale: SaleFormGroupInput = { id: null }): SaleFormGroup {
    const saleRawValue = {
      ...this.getFormDefaults(),
      ...sale,
    };
    return new FormGroup<SaleFormGroupContent>({
      id: new FormControl(
        { value: saleRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      codeProduct: new FormControl(saleRawValue.codeProduct, {
        validators: [Validators.required, Validators.maxLength(10)],
      }),
      nameProduct: new FormControl(saleRawValue.nameProduct, {
        validators: [Validators.required, Validators.maxLength(255)],
      }),
      date: new FormControl(saleRawValue.date, {
        validators: [Validators.required],
      }),
      customer: new FormControl(saleRawValue.customer, {
        validators: [Validators.required],
      }),
    });
  }

  getSale(form: SaleFormGroup): ISale | NewSale {
    return form.getRawValue() as ISale | NewSale;
  }

  resetForm(form: SaleFormGroup, sale: SaleFormGroupInput): void {
    const saleRawValue = { ...this.getFormDefaults(), ...sale };
    form.reset(
      {
        ...saleRawValue,
        id: { value: saleRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): SaleFormDefaults {
    return {
      id: null,
    };
  }
}
