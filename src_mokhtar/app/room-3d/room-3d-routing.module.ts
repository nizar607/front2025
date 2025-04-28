import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomPlannerComponent } from './room-planner/room-planner.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '3D',
    pathMatch: 'full'
  },
  {
    path: '3D',
    component: RoomPlannerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Room3DRoutingModule { }
