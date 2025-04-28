import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CalendarComponent} from "./calendar/calendar.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: "calendar",
    pathMatch: 'full'
  },
  {
    path: 'calendar',
    component: CalendarComponent
  },
  {
    path: '**',
    redirectTo: "calendar"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeetingRoutingModule {
}
