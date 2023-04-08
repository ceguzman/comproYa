import { ISale } from 'app/entities/sale/sale.model';

export interface IProduct {
  id: number;
  nameProduct?: string | null;
  descriptionProduct?: string | null;
  productPrice?: string | null;
  productAumount?: string | null;
  sale?: Pick<ISale, 'id' | 'codeProduct'> | null;
}

export type NewProduct = Omit<IProduct, 'id'> & { id: null };
