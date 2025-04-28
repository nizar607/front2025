import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomPlannerComponent } from './room-planner/room-planner.component';
import { Room3DRoutingModule } from './room-3d-routing.module';



@NgModule({
  declarations: [
    RoomPlannerComponent
  ],
  imports: [
    CommonModule,
    Room3DRoutingModule
  ],
  // bootstrap: [RoomPlannerComponent]
})
export class Room3DModule { }
