import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClientRoutingModule } from './client-routing.module';
import { MainComponent } from './main/main.component';
import { HomepageComponent } from './homepage/homepage.component';
import { HomepageV4Component } from './homepage/homepage-v4.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { Room3dComponent } from './room3d/room3d.component';
import { ArticlesComponent } from './articles/articles.component';
import {MatSliderModule} from '@angular/material/slider';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BasketComponent } from './basket/basket.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { AboutComponent } from './about/about.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { ProfileComponent } from './profile/profile.component';
import { ExperienceComponent } from './experience/experience.component';
import { HomepageV2Component } from './homepage-v2/homepage-v2.component';
import { CheckoutPopupComponent } from './checkout-popup/checkout-popup.component';


@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    HomepageComponent,
    HomepageV4Component,
    MainComponent,
    Room3dComponent,
    ArticlesComponent,
    BasketComponent,
    ProductDetailsComponent,
    AboutComponent,
    FavoritesComponent,
    ProfileComponent,
    ExperienceComponent,
    HomepageV2Component,
    CheckoutPopupComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ClientRoutingModule,
    MatSliderModule,
    MatCheckboxModule,
    MatIconModule,
    MatFormFieldModule
  ],
})
export class ClientModule { }
