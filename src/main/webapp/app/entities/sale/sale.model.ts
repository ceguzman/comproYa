import dayjs from 'dayjs/esm';
import { ICustomer } from 'app/entities/customer/customer.model';

export interface ISale {
  id: number;
  codeProduct?: string | null;
  nameProduct?: string | null;
  date?: dayjs.Dayjs | null;
  customer?: Pick<ICustomer, 'id' | 'documentNumber'> | null;
}

export type NewSale = Omit<ISale, 'id'> & { id: null };
