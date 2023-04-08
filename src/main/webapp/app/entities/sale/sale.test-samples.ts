import dayjs from 'dayjs/esm';

import { ISale, NewSale } from './sale.model';

export const sampleWithRequiredData: ISale = {
  id: 89826,
  codeProduct: 'overriding',
  nameProduct: 'wireless',
  date: dayjs('2023-04-08'),
};

export const sampleWithPartialData: ISale = {
  id: 63174,
  codeProduct: 'Acero Pizz',
  nameProduct: 'Moda deposit Fácil',
  date: dayjs('2023-04-08'),
};

export const sampleWithFullData: ISale = {
  id: 53415,
  codeProduct: 'Berkshire ',
  nameProduct: 'Violeta Sorprendente matrix',
  date: dayjs('2023-04-08'),
};

export const sampleWithNewData: NewSale = {
  codeProduct: 'Patatas Op',
  nameProduct: 'platforms Avon Acero',
  date: dayjs('2023-04-08'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
