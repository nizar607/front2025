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
import { FavoritesComponent } from './favorites/favorites.component';
import { ProfileComponent } from './profile/profile.component';
import { HomepageV4Component } from './homepage/homepage-v4.component';
import { ExperienceComponent } from './experience/experience.component';
import { HomepageV2Component } from './homepage-v2/homepage-v2.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  {
    path: '', component: MainComponent, children: [
      { path: '', component: HomepageComponent },
      { path: 'v3', component: HomepageV4Component },
      { path: 'v2', component: HomepageV2Component },
      { path: 'room-planner', component: RoomPlannerComponent },
      { path: '3D', component: Room3dComponent },
      { path: 'articles', component: ArticlesComponent },
      { path: 'favorites', component: FavoritesComponent },
      { path: 'basket', component: BasketComponent },
      { path: 'product/:id', component: ProductDetailsComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'about', component: AboutComponent },
      { path: 'welcome', component: WelcomeComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
