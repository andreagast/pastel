import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { IndexComponent } from './routes/index/index.component';
import { SaleDisplayComponent } from './components/sale-display/sale-display.component';
import { LucideAngularModule, ArrowRightCircle, ChevronLeft } from 'lucide-angular';
import { IngredientsComponent } from './routes/index/ingredients/ingredients.component';

@NgModule({
  declarations: [IndexComponent, SaleDisplayComponent, IngredientsComponent],
  imports: [CommonModule, PublicRoutingModule, LucideAngularModule.pick({ ArrowRightCircle, ChevronLeft })],
})
export class PublicModule {}
