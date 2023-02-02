import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './routes/index/index.component';
import { ProductEditComponent } from './routes/product-edit/product-edit.component';
import { ProductListComponent } from './routes/product-list/product-list.component';
import { SaleListComponent } from './routes/sale-list/sale-list.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      {
        path: 'products/new',
        component: ProductEditComponent,
      },
      {
        path: 'products/:id',
        component: ProductEditComponent,
      },
      {
        path: 'products',
        component: ProductListComponent,
      },
      {
        path: '',
        component: SaleListComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BackofficeRoutingModule {}
