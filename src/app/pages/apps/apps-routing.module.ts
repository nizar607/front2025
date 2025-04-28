  import {NgModule} from '@angular/core';
  import {RouterModule, Routes} from '@angular/router';

  // Component
  import {CalendarComponent} from './calendar/calendar.component';
  import {ChatComponent} from './chat/chat.component';
  import {EmailComponent} from './email/email.component';
  import {FileManagerComponent} from './file-manager/file-manager.component';
  import {WidgetsComponent} from './widgets/widgets.component';
  import {MeetingResolver} from "../../core/resolvers/MeetingResolver";
import { CalendarResolver } from 'src/app/core/resolvers/CalendarResolver';


  const routes: Routes = [
    {
      path: "calendar",
      component: CalendarComponent,
      resolve: {
        data: CalendarResolver
      }
    },
    {
      path: "calendar/:id",
      component: CalendarComponent,
    },
    {
      path: "chat",
      component: ChatComponent
    },
    {
      path: "email",
      component: EmailComponent
    },
    {
      path: "file-manager",
      component: FileManagerComponent
    },
    {
      path: "widgets",
      component: WidgetsComponent
    }
  ];

  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class AppsRoutingModule {
  }
