import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'backoffice',
        loadChildren: () => import('../backoffice/backoffice.module').then((m) => m.BackofficeModule),
      },
      {
        path: '',
        loadChildren: () => import('../public/public.module').then((m) => m.PublicModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
