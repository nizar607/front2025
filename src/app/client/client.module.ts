import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClientRoutingModule } from './client-routing.module';
import { MainComponent } from './main/main.component';
import { HomepageComponent } from './homepage/homepage.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { Room3dComponent } from './room3d/room3d.component';
import { ArticlesComponent } from './articles/articles.component';
import { ArticleComponent } from './article/article.component';
import {MatSliderModule} from '@angular/material/slider';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    HomepageComponent,
    MainComponent,
    Room3dComponent,
    ArticlesComponent,
    ArticleComponent,
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
