import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [MainComponent, FooterComponent, HeaderComponent],
  imports: [CommonModule, MainRoutingModule],
})
export class MainModule {}
