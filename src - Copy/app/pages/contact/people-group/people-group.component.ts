import { Component, ViewChild } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';

import { Store } from '@ngrx/store';
import { ModalDirective, ModalModule } from 'ngx-bootstrap/modal';
import { addpeopleGroupData, deletepeopleGroupData, fetchpeopleGroupData, updatepeopleGroupData } from 'src/app/store/PeopleGroup/peapleGroup.action';
import { selectData } from 'src/app/store/PeopleGroup/peapleGroup.selector';
import {  getisLoggedIn } from 'src/app/store/Authentication/authentication-selector';
import { peopleGroupModel } from 'src/app/store/PeopleGroup/peapleGroup.model';

@Component({
  selector: 'app-people-group',
  templateUrl: './people-group.component.html',
  styleUrl: './people-group.component.scss'
})
export class PeopleGroupComponent {
  peopleGroupList: peopleGroupModel[] = [];

  @ViewChild('addPeopleGroup', { static: false }) addPeopleGroup?: ModalDirective;
  @ViewChild('deleteRecordModal', { static: false }) deleteRecordModal?: ModalDirective;

  deleteID: any;
  name?: string;
  action: string = '';

  peopleGroupItem!: any;
  constructor(private formBuilder: UntypedFormBuilder, public store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(fetchpeopleGroupData());
    this.store.select(selectData).subscribe((data) => {
      this.peopleGroupList = data;
      console.log('data', data);
    });
  
    this.store.select(getisLoggedIn).subscribe((user) => {
      console.log('user', user);
    });
  }

  deleteData(id: any) {
    this.deleteRecordModal?.hide();
    if (id) {
      this.store.dispatch(deletepeopleGroupData({ id: this.deleteID.toString() }));
    }
    // this.store.dispatch(deletecourcelistData({ id: this.checkedValGet.toString() }));
    this.deleteRecordModal?.hide();
    // this.masterSelected = false
  }

  // Delete Product
  removeItem(id: any) {
    this.deleteID = id
    this.deleteRecordModal?.show()
  }

  openAddModal() {
    this.name = '';
    this.action = 'Add';
    this.addPeopleGroup?.show();
  }

  openEditModal(item: peopleGroupModel) {
    this.action = 'Edit';

    this.peopleGroupItem = item;
    this.name = item.name;
    this.addPeopleGroup?.show();
  }


  submit() {
    if (this.action === 'Add') {
      const peopleGroupName = this.name;
      this.store.dispatch(addpeopleGroupData({ name: peopleGroupName! }));
      this.addPeopleGroup?.hide();
    }

    if (this.action === 'Edit') {
      
      this.peopleGroupItem = {
        ...this.peopleGroupItem,
        name: this.name
    };

      this.store.dispatch(updatepeopleGroupData({ updatedData: this.peopleGroupItem } ));
      this.addPeopleGroup?.hide();
    }
    else {
      this.addPeopleGroup?.hide();
    }
  }
}
