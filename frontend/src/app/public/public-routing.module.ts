import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './routes/index/index.component';
import { IngredientsComponent } from './routes/index/ingredients/ingredients.component';

const routes: Routes = [
  {
    path: 'ingredients/:id',
    component: IngredientsComponent,
  },
  {
    path: '',
    component: IndexComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
