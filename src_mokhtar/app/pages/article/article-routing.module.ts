import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GridComponent } from './grid/grid.component';
import { ListComponent } from '../stock/list/list.component';

const routes: Routes = [

  {
    pathMatch:'full',
    path: '',
    redirectTo: 'grid',
  },
  {
    path: 'grid',
    component: GridComponent,
  },
  {
    path: 'list',
    component: ListComponent,
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleRoutingModule { }
