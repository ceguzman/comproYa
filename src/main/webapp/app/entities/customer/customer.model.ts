import { ITypeDocument } from 'app/entities/type-document/type-document.model';

export interface ICustomer {
  id: number;
  documentNumber?: string | null;
  firstName?: string | null;
  firstSurname?: string | null;
  secondName?: string | null;
  secondSurname?: string | null;
  typeDocument?: Pick<ITypeDocument, 'id' | 'documentName'> | null;
}

export type NewCustomer = Omit<ICustomer, 'id'> & { id: null };
