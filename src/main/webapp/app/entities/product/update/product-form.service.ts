import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IProduct, NewProduct } from '../product.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IProduct for edit and NewProductFormGroupInput for create.
 */
type ProductFormGroupInput = IProduct | PartialWithRequiredKeyOf<NewProduct>;

type ProductFormDefaults = Pick<NewProduct, 'id'>;

type ProductFormGroupContent = {
  id: FormControl<IProduct['id'] | NewProduct['id']>;
  nameProduct: FormControl<IProduct['nameProduct']>;
  descriptionProduct: FormControl<IProduct['descriptionProduct']>;
  productPrice: FormControl<IProduct['productPrice']>;
  productAumount: FormControl<IProduct['productAumount']>;
  sale: FormControl<IProduct['sale']>;
};

export type ProductFormGroup = FormGroup<ProductFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ProductFormService {
  createProductFormGroup(product: ProductFormGroupInput = { id: null }): ProductFormGroup {
    const productRawValue = {
      ...this.getFormDefaults(),
      ...product,
    };
    return new FormGroup<ProductFormGroupContent>({
      id: new FormControl(
        { value: productRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      nameProduct: new FormControl(productRawValue.nameProduct, {
        validators: [Validators.required, Validators.maxLength(50)],
      }),
      descriptionProduct: new FormControl(productRawValue.descriptionProduct, {
        validators: [Validators.required, Validators.maxLength(255)],
      }),
      productPrice: new FormControl(productRawValue.productPrice, {
        validators: [Validators.required, Validators.maxLength(50)],
      }),
      productAumount: new FormControl(productRawValue.productAumount, {
        validators: [Validators.required, Validators.maxLength(100)],
      }),
      sale: new FormControl(productRawValue.sale, {
        validators: [Validators.required],
      }),
    });
  }

  getProduct(form: ProductFormGroup): IProduct | NewProduct {
    return form.getRawValue() as IProduct | NewProduct;
  }

  resetForm(form: ProductFormGroup, product: ProductFormGroupInput): void {
    const productRawValue = { ...this.getFormDefaults(), ...product };
    form.reset(
      {
        ...productRawValue,
        id: { value: productRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ProductFormDefaults {
    return {
      id: null,
    };
  }
}
