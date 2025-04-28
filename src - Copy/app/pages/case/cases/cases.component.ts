import { Component, ViewChild } from '@angular/core';

// Get Modal
import { FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { DatePipe, DecimalPipe } from '@angular/common';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Store } from '@ngrx/store';
import { selectData as selectPeopleGroup } from 'src/app/store/PeopleGroup/peapleGroup.selector';
import { selectData as selectContacts } from 'src/app/store/Contact/contact.selector';
import { selectData as selectCases } from 'src/app/store/Case/case.selector';
import { selectagentData } from 'src/app/store/Agent/agent-selector';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { cloneDeep } from 'lodash';
import { assignesTickets } from 'src/app/core/data';
import { addcontactData, fetchcontactData, updatecontactData } from "../../../store/Contact/contact.action";
import { addagentData, fetchagentData } from "../../../store/Agent/agent.action";
import { addCaseData, deleteCaseData, fetchCaseData } from "../../../store/Case/case.action";
import { CaseService } from "../../../core/services/case/case.service";
import { CaseModel } from "../../../store/Case/case.model";
import { fetchpeopleGroupData } from "../../../store/PeopleGroup/peapleGroup.action";
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cases',
  templateUrl: './cases.component.html',
  styleUrl: './cases.component.scss'
})

// List component
export class CasesComponent {

  @ViewChild('addCourse', { static: false }) addCourse?: ModalDirective;
  @ViewChild('addTickets', { static: false }) addTickets?: ModalDirective;
  @ViewChild('deleteRecordModal', { static: false }) deleteRecordModal?: ModalDirective;
  @ViewChild('addContact', { static: false }) addContact?: ModalDirective;
  @ViewChild('updateCase', { static: false }) updateCase?: ModalDirective;

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  deleteID: any;
  endItem: any
  submitted = false;
  masterSelected!: boolean;
  casesList: any[] = [];
  allCasesList: any[] = [];
  peopleGroup: any[] = [];
  peopleGroupList: any[] = [];
  caseToUpdate: any;
  // assigndata: any


  term: any;
  contactsList: any[] = [];
  agentsList: any[] = [];
  assignedContacts: any[] = [];
  assignedAgents: any[] = [];
  editData: any;
  isLinear = true;
  caseForm!: FormGroup;
  ContactForm!: FormGroup;

  flatpickrOptions = {
    altInput: true,
    altFormat: 'd/m/Y',
    dateFormat: 'd/m/Y'
  };

  statusList: string[] = [
    "OPENED",
    "CLOSED"
  ]
  currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  accesses:any = [];

  constructor(private formBuilder: UntypedFormBuilder, public store: Store, public datepipe: DatePipe, private router: Router, private caseService: CaseService, private http: HttpClient) {
  }

  fetchCasesList() {
    this.store.dispatch(fetchCaseData());
    this.store.select(selectCases).subscribe((data) => {
      this.casesList = data;
      this.allCasesList = data;
      this.casesList = cloneDeep(this.allCasesList.slice(0, 10))
      console.log(data, 'casesList');
    });
  }

  ngOnInit(): void {

    this.http.get('http://localhost:8080/api/agent/accesses/' + this.currentUser.email).subscribe((data: any) => {
      this.accesses = data;
      console.log('accesses : ', data);
    });
    /**
     * BreadCrumb
     */
    this.breadCrumbItems = [
      { label: 'Case', active: true },
      { label: 'List View', active: true }
    ];

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

    /**
     * Form Validation
     */

    this.caseForm = this.formBuilder.group({
      title: ['', Validators.required],
      number: ['', Validators.required],
      description: ['', Validators.required],
      type: ['', Validators.required],
    });


    this.store.dispatch(fetchpeopleGroupData());
    this.store.select(selectPeopleGroup).subscribe((data) => {
      this.peopleGroupList = data;
    });

    this.store.dispatch(fetchCaseData());
    this.store.select(selectCases).subscribe((data) => {
      this.casesList = data;
      this.allCasesList = data;
      this.casesList = cloneDeep(this.allCasesList.slice(0, 10))
      console.log(data, 'casesList');
    });


    this.store.dispatch(fetchcontactData());
    this.store.select(selectContacts).subscribe((data) => {
      this.contactsList = data.map((element: any) => {
        return { ...element, checked: '0', image: "assets/images/users/user-dummy-img.jpg" }
      });
    });


    this.store.dispatch(fetchagentData());
    this.store.select(selectagentData).subscribe((data) => {
      this.agentsList = data.map((element: any) => {
        return { ...element, checked: '0' }
      });
    });

    document.getElementById('elmLoader')?.classList.add('d-none')

  }

  setSelectedCase(caseToUpdate: any) {
    console.log('caseToUpdate : ', caseToUpdate);
    this.caseToUpdate = caseToUpdate;
    this.caseForm.patchValue({
      title: caseToUpdate.title,
      number: caseToUpdate.number,
      description: caseToUpdate.description,
      type: caseToUpdate.type,
    });
    this.updateCase?.show();
  }

  get currentDate() {
    const date = new Date();
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  }

  // Edit Data
  editList(id: any) {
    this.addTickets?.show()
    var modaltitle = document.querySelector('.modal-title') as HTMLAreaElement
    modaltitle.innerHTML = 'Edit Product'
    var modalbtn = document.getElementById('add-btn') as HTMLAreaElement
    modalbtn.innerHTML = 'Update';
    /*this.editData = this.tickets[id];
    this.assignto = this.editData.assignedto;
     */
  }

  assignContact(id: any) {

    if (this.contactsList[id]?.checked == '0') {
      this.contactsList[id].checked = '1'

    } else {
      this.contactsList[id].checked = '0';
    }

    this.assignedContacts = [];
    this.contactsList.forEach((element: any) => {
      if (element.checked == '1') {
        this.assignedContacts.push(element)
      }
    });
  }

  assignAgent(id: any) {

    if (this.agentsList[id]?.checked == '0') {
      this.agentsList[id].checked = '1'
    } else {
      this.agentsList[id].checked = '0';
    }

    this.assignedAgents = [];
    this.agentsList.forEach((element: any) => {
      if (element.checked == '1') {
        this.assignedAgents.push(element)
      }
    });
  }


  saveCase() {

    if (this.caseForm.valid) {

      const newData = {
        ...this.caseForm.value,
        contacts: this.assignedContacts.map((element: any) => element.id),
        agents: this.assignedAgents.map((element: any) => element.id),
      };


      console.log('newData : ', newData);

      /*this.caseService.addData(newData).subscribe((data) => {
        console.log('data : ', data);
      });
       */

      //console.log('newData : ', newData);


      this.store.dispatch(addCaseData({ newData: newData }));

      this.caseForm.reset();
      this.addCourse?.hide()
    }

  }

  change(event: any) {
  }

  checkedValGet: any[] = [];

  // The master checkbox will check/ uncheck all items
  checkUncheckAll(ev: any) {
    /*this.tickets = this.tickets.map((x: { states: any }) => ({...x, states: ev.target.checked}));
    var checkedVal: any[] = [];
    var result;
    for (var i = 0; i < this.tickets.length; i++) {
      if (this.tickets[i].states == true) {
        result = this.tickets[i].id;
        checkedVal.push(result);
      }

    }

    this.checkedValGet = checkedVal;
    checkedVal.length > 0 ? document.getElementById("remove-actions")?.classList.remove('d-none') : document.getElementById("remove-actions")?.classList.add('d-none');
  */
  }

  // Delete Product
  removeItem(id: any) {
    this.deleteID = id
    this.deleteRecordModal?.show()
  }

  deleteData(id: any) {
    this.deleteRecordModal?.hide();
    if (id) {
      this.store.dispatch(deleteCaseData({ id: this.deleteID.toString() }));
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
    /*const sortedArray = [...this.tickets]; // Create a new array
    sortedArray.sort((a, b) => {
      const res = this.compare(a[column], b[column]);
      return this.direction === 'asc' ? res : -res;
    });
    this.tickets = sortedArray;

     */
  }

  compare(v1: string | number, v2: string | number) {
    return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
  }


  // filterdata
  filterdata() {
    /* if (this.term) {
       this.tickets = this.alltickets.filter((es: any) => es.ticketTitle.toLowerCase().includes(this.term.toLowerCase()))
     } else {
       this.tickets = this.alltickets.slice(0, 10);
     }
     // noResultElement
     this.updateNoResultDisplay();

     */
  }

  // no result
  updateNoResultDisplay() {
    const noResultElement = document.querySelector('.noresult') as HTMLElement;
    const paginationElement = document.getElementById('pagination-element') as HTMLElement;

    if (this.term && this.casesList.length === 0) {
      noResultElement.classList.remove('d-none')
      paginationElement.classList.add('d-none')

    } else {
      noResultElement.classList.add('d-none')
      paginationElement.classList.remove('d-none')
    }
  }

  // pagechanged
  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    this.endItem = event.page * event.itemsPerPage;
    this.casesList = this.allCasesList.slice(startItem, this.endItem);
  }

  get formValue() {
    return this.ContactForm.controls;
  }

  saveContact() {

    const addedContact = { peopleGroup: this.ContactForm.value.peopleGroup.id, ...this.ContactForm.value };
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
    this.ContactForm.reset();
    this.addContact?.hide();

  }

  navigateToDetails(selectedCase: any) {
    this.router.navigate(['/case/details', selectedCase.id]);
  }




  @ViewChild('updateCase') public modal!: ModalDirective;


  caseTypes = [
    { name: 'Criminal', value: 'Criminal' },
    { name: 'Civil', value: 'Civil' },
    { name: 'Family', value: 'Family' },
    { name: 'Labor', value: 'Labor' },
    { name: 'Commercial', value: 'Commercial' }
  ];


  async onSubmit() {
    console.log("this.caseForm.valid", this.caseForm.valid);

    try {
      this.caseService.updateData(this.caseToUpdate.id, this.caseForm.value).subscribe((data) => {
        this.fetchCasesList();
      });
      this.modal.hide();
    } catch (error) {
      console.error('Error saving case:', error);
    }

  }




















}


