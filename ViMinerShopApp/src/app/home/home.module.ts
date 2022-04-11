import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { HomeRoutes } from './home.routes';
import { NewMinerComponent } from './new-miner/new-miner.component';
import { HighPerformanceMinerComponent } from './high-performance-miner/high-performance-miner.component';
import { ImageSliderComponent } from './image-slider/image-slider.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(HomeRoutes),
    NgbModule,
    TranslateModule
  ],
  declarations: [
    HomeComponent,
    NewMinerComponent,
    HighPerformanceMinerComponent,
    ImageSliderComponent
  ],
  providers: [TranslatePipe]
})
export class HomeModule {
}
