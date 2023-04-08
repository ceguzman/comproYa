import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { SaleComponent } from './list/sale.component';
import { SaleDetailComponent } from './detail/sale-detail.component';
import { SaleUpdateComponent } from './update/sale-update.component';
import { SaleDeleteDialogComponent } from './delete/sale-delete-dialog.component';
import { SaleRoutingModule } from './route/sale-routing.module';

@NgModule({
  imports: [SharedModule, SaleRoutingModule],
  declarations: [SaleComponent, SaleDetailComponent, SaleUpdateComponent, SaleDeleteDialogComponent],
})
export class SaleModule {}
