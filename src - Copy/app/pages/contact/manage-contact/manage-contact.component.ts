import {Component, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {ModalDirective} from 'ngx-bootstrap/modal';
import {Store} from '@ngrx/store';
import {cloneDeep} from 'lodash';
import {addcontactData, deletecontactData, fetchcontactData, updatecontactData} from 'src/app/store/Contact/contact.action';
import {selectData} from 'src/app/store/Contact/contact.selector';
import {selectData as selectDataPeopleGroup} from 'src/app/store/PeopleGroup/peapleGroup.selector';
import {addpeopleGroupData, deletepeopleGroupData, fetchpeopleGroupData, updatepeopleGroupData } from 'src/app/store/PeopleGroup/peapleGroup.action';
import {peopleGroupModel} from 'src/app/store/PeopleGroup/peapleGroup.model';
import {contactModel} from 'src/app/store/Contact/contact.model';


@Component({
  selector: 'app-manage-contact',
  templateUrl: './manage-contact.component.html',
  styleUrl: './manage-contact.component.scss'
})

// List Component
export class ManageContactComponent {
  endItem: any
  // bread crumb items
  breadCrumbItems!: Array<{}>;
  totalinstructorChart: any;
  totalcoursesChart: any;
  instuctoractivity: any;
  files: File[] = [];
  deleteID: any;
  instructorslist: any
  ContactForm!: FormGroup;
  submitted = false;
  masterSelected!: boolean;

  contactList: any;
  contacts: any;
  peopleGroupList: peopleGroupModel[] = [];

  name?: string;
  action: string = '';
  contactItem!: contactModel;


  @ViewChild('addContact', {static: false}) addContact?: ModalDirective;
  @ViewChild('deleteRecordModal', {static: false}) deleteRecordModal?: ModalDirective;
  editData: any;
  term: any;

  Default: any[] = [];

  constructor(private formBuilder: FormBuilder, public store: Store) {
  }

  ngOnInit(): void {
    /**
     * BreadCrumb
     */
    this.breadCrumbItems = [
      {label: 'Contacts', active: true},
      {label: 'Manage people', active: true}
    ];

    this.store.dispatch(fetchpeopleGroupData());


    this.store.select(selectDataPeopleGroup).subscribe((data) => {
      this.peopleGroupList = data;
      this.Default = data;
      console.log('peopleGroupList : ', this.peopleGroupList);
    });

    this.ContactForm = this.formBuilder.group({
      firstName: ['MOKH', [Validators.required, Validators.minLength(3)]],
      middleName: ['MR', [Validators.required]],
      lastName: ['HADDED', [Validators.required, Validators.minLength(3)]],
      birthday: ['', [Validators.required]],
      email: ['mokhtar@gmail.com', [Validators.required, Validators.email]],
      peopleGroup: ['', [Validators.required]],
      phoneNumber: ["25652735", [Validators.required, Validators.pattern('^\\d{8}$')]],
      address: ['Tunis', [Validators.required]],
      city: ['Manzel bourguiba', [Validators.required]],
      state: ['Bizete', [Validators.required]],
      zipCode: [7050, [Validators.required]],
    });


    // Fetch Data
    setTimeout(() => {
      this.store.dispatch(fetchcontactData());
      this.store.select(selectData).subscribe((data) => {
        console.log(data);
        this.contactList = data;
        this.contacts = data;
        this.contacts = cloneDeep(this.contactList.slice(0, 10));
      });
      document.getElementById('elmLoader')?.classList.add('d-none')
    }, 1000)

  }

  // Edit Data
  editList(id: any) {
    this.addContact?.show()
    var modaltitle = document.querySelector('.modal-title') as HTMLAreaElement
    modaltitle.innerHTML = 'Edit Product'
    var modalbtn = document.getElementById('add-btn') as HTMLAreaElement
    modalbtn.innerHTML = 'Update'

    this.editData = this.contacts[id]
    this.ContactForm.patchValue(this.contacts[id]);
  }

  openAddModal() {
    // this.name = '';
    this.action = 'Add';
    this.ContactForm.reset();
    this.addContact?.show();
  }

  openEditModal(item: contactModel) {
    this.action = 'Edit';

    this.contactItem = item;

    this.ContactForm.patchValue(item);
    this.addContact?.show();
  }


  saveContact() {
    if (this.action === 'Add') {

      const addedContact = {peopleGroup: this.ContactForm.value.peopleGroup.id, ...this.ContactForm.value};
      console.log('addedContact : ', addedContact);

      this.store.dispatch(addcontactData({
        contactData: {
          "address": this.ContactForm.value['address'],
          "birthday": this.ContactForm.value['birthday'],
          "city": this.ContactForm.value['city'],
          "email": this.ContactForm.value['email'],
          "firstName": this.ContactForm.value['firstName'],
          "lastName": this.ContactForm.value['lastName'],
          "middleName": this.ContactForm.value['middleName'],
          "peopleGroup": this.ContactForm.value.peopleGroup.id,
          "phoneNumber": this.ContactForm.value['phoneNumber'],
          "state": this.ContactForm.value['state'],
          "zipCode": this.ContactForm.value['zipCode']
        }
      }));
      console.log('this.AddContactForm.value : ', this.ContactForm.value);
      this.addContact?.hide();
    }

    if (this.action === 'Edit') {
      const birthday = this.ContactForm.value['birthday'].replace(/-/g, '/');
      console.log('this.contactItem : ', this.contactItem);
      this.store.dispatch(updatecontactData({
        id: this.contactItem.id, updatedData: {
          "address": this.ContactForm.value['address'],
          "birthday": birthday,
          "city": this.ContactForm.value['city'],
          "email": this.ContactForm.value['email'],
          "firstName": this.ContactForm.value['firstName'],
          "lastName": this.ContactForm.value['lastName'],
          "middleName": this.ContactForm.value['middleName'],
          "peopleGroup": this.ContactForm.value.peopleGroup.id,
          "phoneNumber": this.ContactForm.value['phoneNumber'],
          "state": this.ContactForm.value['state'],
          "zipCode": this.ContactForm.value['zipCode']
        }
      }));
      this.addContact?.hide();
    } else {
      this.addContact?.hide();
    }

  }

  checkedValGet: any[] = [];

  // The master checkbox will check/ uncheck all items
  checkUncheckAll(ev: any) {
    this.contacts.forEach((x: { state: any; }) => x.state = ev.target.checked)
    var checkedVal: any[] = [];
    var result
    for (var i = 0; i < this.contacts.length; i++) {
      if (this.contacts[i].state == true) {
        result = this.contacts[i].id;
        checkedVal.push(result);
      }
    }
    this.checkedValGet = checkedVal
    checkedVal.length > 0 ? document.getElementById("remove-actions")?.classList.remove('d-none') : document.getElementById("remove-actions")?.classList.add('d-none');
  }

  // Select Checkbox value Get
  onCheckboxChange(e: any) {
    var checkedVal: any[] = [];
    var result
    for (var i = 0; i < this.contacts.length; i++) {
      if (this.contacts[i].state == true) {
        result = this.contacts[i].id;
        checkedVal.push(result);
      }
    }
    this.checkedValGet = checkedVal
    checkedVal.length > 0 ? document.getElementById("remove-actions")?.classList.remove('d-none') : document.getElementById("remove-actions")?.classList.add('d-none');
  }

  get formValue() {
    return this.ContactForm.controls;
  }

  // Delete Product
  removeItem(id: any) {
    this.deleteID = id
    this.deleteRecordModal?.show()
  }

  confirmDelete(id: any) {
    this.deleteRecordModal?.hide();
    if (id) {
      this.store.dispatch(deletecontactData({id: this.deleteID.toString()}));
    }
    this.deleteRecordModal?.hide();
    this.masterSelected = false
  }

  // Sort Data
  direction: any = 'asc';

  onSort(column: any) {
    if (this.direction == 'asc') {
      this.direction = 'desc';
    } else {
      this.direction = 'asc';
    }
    const sortedArray = [...this.contacts]; // Create a new array
    sortedArray.sort((a, b) => {
      const res = this.compare(a[column], b[column]);
      return this.direction === 'asc' ? res : -res;
    });
    this.contacts = sortedArray;
  }

  compare(v1: string | number, v2: string | number) {
    return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
  }

  // pagechanged
  pageChanged(event: any) {
    const startItem = (event.page - 1) * event.itemsPerPage;
    this.endItem = event.page * event.itemsPerPage;
    this.contacts = this.contactList.slice(startItem, this.endItem);
  }

  // filterdata
  filterdata() {
    if (this.term) {
      this.contacts = this.contactList.filter((el: any) => el.firstName.toLowerCase().includes(this.term.toLowerCase()) || el.lastName.toLowerCase().includes(this.term.toLowerCase()) || el.peopleGroup.name.toLowerCase().includes(this.term.toLowerCase()) || el.phoneNumber.toLowerCase().includes(this.term.toLowerCase()))
    } else {
      this.contacts = this.contactList.slice(0, 10)
    }
    // noResultElement
    this.updateNoResultDisplay();
  }

  // no result
  updateNoResultDisplay() {
    const noResultElement = document.querySelector('.noresult') as HTMLElement;
    const paginationElement = document.getElementById('pagination-element') as HTMLElement
    if (this.term && this.contacts.length === 0) {
      noResultElement.style.display = 'block';
      paginationElement.classList.add('d-none')
    } else {
      noResultElement.style.display = 'none';
      paginationElement.classList.remove('d-none')
    }
  }
}
