import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BackofficeRoutingModule } from './backoffice-routing.module';
import { IndexComponent } from './routes/index/index.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateSalePanelComponent } from './components/create-sale-panel/create-sale-panel.component';
import { SaleListPanelComponent } from './components/sale-list-panel/sale-list-panel.component';
import { LucideAngularModule, Trash2, Edit2, Plus } from 'lucide-angular';
import { ProductListComponent } from './routes/product-list/product-list.component';
import { ProductEditComponent } from './routes/product-edit/product-edit.component';
import { SaleListComponent } from './routes/sale-list/sale-list.component';

@NgModule({
  declarations: [
    IndexComponent,
    CreateSalePanelComponent,
    SaleListComponent,
    ProductListComponent,
    ProductEditComponent,
    SaleListPanelComponent,
  ],
  imports: [
    CommonModule,
    BackofficeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    LucideAngularModule.pick({ Trash2, Edit2, Plus }),
  ],
})
export class BackofficeModule {}
