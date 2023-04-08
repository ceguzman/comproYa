import { State } from 'app/entities/enumerations/state.model';

import { ITypeDocument, NewTypeDocument } from './type-document.model';

export const sampleWithRequiredData: ITypeDocument = {
  id: 72385,
  initials: 'Ferrocarril Ergonómi',
  documentName: 'Asturias metrics Jar',
  stateTypeDocument: State['INACTIVE'],
};

export const sampleWithPartialData: ITypeDocument = {
  id: 2654,
  initials: 'Morado Seguro',
  documentName: 'Buckinghamshire',
  stateTypeDocument: State['INACTIVE'],
};

export const sampleWithFullData: ITypeDocument = {
  id: 55810,
  initials: 'desafío Rioja',
  documentName: 'Pescado',
  stateTypeDocument: State['INACTIVE'],
};

export const sampleWithNewData: NewTypeDocument = {
  initials: 'Granito Música Zapat',
  documentName: 'Salvador Account',
  stateTypeDocument: State['INACTIVE'],
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
