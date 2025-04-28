import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeopleGroupComponent } from './people-group/people-group.component';
import { ManageContactComponent } from './manage-contact/manage-contact.component';
import { ContactDetailsComponent } from './contact-details/contact-details.component';

const routes: Routes = [
  {
    path: "people-group",
    component: PeopleGroupComponent
  },
  {
    path: "manage-contacts",
    component: ManageContactComponent
  },
  {
    path: "details/:id",
    component: ContactDetailsComponent
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactRoutingModule { }
