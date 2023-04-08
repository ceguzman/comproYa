import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'customer',
        data: { pageTitle: 'Customers' },
        loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule),
      },
      {
        path: 'type-document',
        data: { pageTitle: 'TypeDocuments' },
        loadChildren: () => import('./type-document/type-document.module').then(m => m.TypeDocumentModule),
      },
      {
        path: 'sale',
        data: { pageTitle: 'Sales' },
        loadChildren: () => import('./sale/sale.module').then(m => m.SaleModule),
      },
      {
        path: 'product',
        data: { pageTitle: 'Products' },
        loadChildren: () => import('./product/product.module').then(m => m.ProductModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
