import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { RoomPlannerComponent } from './room-planner/room-planner.component';
import { MainComponent } from './main/main.component';
import { Room3dComponent } from './room3d/room3d.component';
import { ArticlesComponent } from './articles/articles.component';
import { BasketComponent } from './basket/basket.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  {
    path: '', component: MainComponent, children: [
      { path: '', component: HomepageComponent },
      { path: 'room-planner', component: RoomPlannerComponent },
      { path: '3D', component: Room3dComponent },
      { path: 'articles', component: ArticlesComponent },
      { path: 'basket', component: BasketComponent },
      { path: 'product/:id', component: ProductDetailsComponent },
      { path: 'about', component: AboutComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
