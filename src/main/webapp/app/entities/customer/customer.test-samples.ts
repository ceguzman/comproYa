import { ICustomer, NewCustomer } from './customer.model';

export const sampleWithRequiredData: ICustomer = {
  id: 24379,
  documentNumber: 'Operaciones',
  firstName: 'Octavio',
  firstSurname: 'Loan Increible generate',
};

export const sampleWithPartialData: ICustomer = {
  id: 50418,
  documentNumber: 'Cantabria Artesanal Nacional',
  firstName: 'Sergio',
  firstSurname: 'payment discreta calculate',
  secondName: 'Cataluña Mancha',
  secondSurname: 'Market Euro Galicia',
};

export const sampleWithFullData: ICustomer = {
  id: 31591,
  documentNumber: 'seize Violeta',
  firstName: 'Inés',
  firstSurname: 'Multi revolutionary Videojuegos',
  secondName: 'Berkshire invoice Patatas',
  secondSurname: 'deposit Joyería back-end',
};

export const sampleWithNewData: NewCustomer = {
  documentNumber: 'Rústico Web',
  firstName: 'José',
  firstSurname: 'Aruba Algodón',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
