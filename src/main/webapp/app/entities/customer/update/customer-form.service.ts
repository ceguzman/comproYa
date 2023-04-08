import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ICustomer, NewCustomer } from '../customer.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICustomer for edit and NewCustomerFormGroupInput for create.
 */
type CustomerFormGroupInput = ICustomer | PartialWithRequiredKeyOf<NewCustomer>;

type CustomerFormDefaults = Pick<NewCustomer, 'id'>;

type CustomerFormGroupContent = {
  id: FormControl<ICustomer['id'] | NewCustomer['id']>;
  documentNumber: FormControl<ICustomer['documentNumber']>;
  firstName: FormControl<ICustomer['firstName']>;
  firstSurname: FormControl<ICustomer['firstSurname']>;
  secondName: FormControl<ICustomer['secondName']>;
  secondSurname: FormControl<ICustomer['secondSurname']>;
  typeDocument: FormControl<ICustomer['typeDocument']>;
};

export type CustomerFormGroup = FormGroup<CustomerFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CustomerFormService {
  createCustomerFormGroup(customer: CustomerFormGroupInput = { id: null }): CustomerFormGroup {
    const customerRawValue = {
      ...this.getFormDefaults(),
      ...customer,
    };
    return new FormGroup<CustomerFormGroupContent>({
      id: new FormControl(
        { value: customerRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      documentNumber: new FormControl(customerRawValue.documentNumber, {
        validators: [Validators.required, Validators.maxLength(255)],
      }),
      firstName: new FormControl(customerRawValue.firstName, {
        validators: [Validators.required, Validators.maxLength(50)],
      }),
      firstSurname: new FormControl(customerRawValue.firstSurname, {
        validators: [Validators.required, Validators.maxLength(50)],
      }),
      secondName: new FormControl(customerRawValue.secondName, {
        validators: [Validators.maxLength(50)],
      }),
      secondSurname: new FormControl(customerRawValue.secondSurname, {
        validators: [Validators.maxLength(50)],
      }),
      typeDocument: new FormControl(customerRawValue.typeDocument, {
        validators: [Validators.required],
      }),
    });
  }

  getCustomer(form: CustomerFormGroup): ICustomer | NewCustomer {
    return form.getRawValue() as ICustomer | NewCustomer;
  }

  resetForm(form: CustomerFormGroup, customer: CustomerFormGroupInput): void {
    const customerRawValue = { ...this.getFormDefaults(), ...customer };
    form.reset(
      {
        ...customerRawValue,
        id: { value: customerRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CustomerFormDefaults {
    return {
      id: null,
    };
  }
}
