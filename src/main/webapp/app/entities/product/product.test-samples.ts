import { IProduct, NewProduct } from './product.model';

export const sampleWithRequiredData: IProduct = {
  id: 77672,
  nameProduct: 'plataforma',
  descriptionProduct: 'cross-platform Refinado deposit',
  productPrice: 'función Mesa',
  productAumount: 'Rua',
};

export const sampleWithPartialData: IProduct = {
  id: 66440,
  nameProduct: 'neural Hogar Mobilidad',
  descriptionProduct: 'Colonia',
  productPrice: 'Rioja Plástico Increible',
  productAumount: 'Dinánmico acompasada vertical',
};

export const sampleWithFullData: IProduct = {
  id: 30768,
  nameProduct: 'Adelante copying Atún',
  descriptionProduct: 'Ladrillo Multi calculate',
  productPrice: 'Jardines withdrawal architectures',
  productAumount: 'Universal bricks-and-clicks',
};

export const sampleWithNewData: NewProduct = {
  nameProduct: 'compressing out-of-the-box Profundo',
  descriptionProduct: 'monitor feed',
  productPrice: 'copy Account orquestar',
  productAumount: 'Bebes strategize Heredado',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
