import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { C } from '@fullcalendar/core/internal-common';
import { CasesComponent } from './cases/cases.component';
import { DetailsComponent } from './details/details.component';
import { TaskComponent } from './task/task.component';

const routes: Routes = [
  {
    path: 'cases-list',
    component: CasesComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'cases-list'
  },

  {
    path: 'courses', loadChildren: () => import('./courses/courses.module').then(m => m.CoursesModule)
  },
  {
    path: "tasks",
    component: TaskComponent
  },

  {
    path: "details/:id",
    component: DetailsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CaseRoutingModule { }
