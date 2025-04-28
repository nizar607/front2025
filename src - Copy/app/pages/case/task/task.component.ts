import { Component, ViewChild } from '@angular/core';

import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Store } from '@ngrx/store';
import { addcustomerData, deletecustomerData, fetchcustomerData, updatecustomerData } from 'src/app/store/Customer/customer.action';
import { selectData } from 'src/app/store/Customer/customer.selector';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { selectData as selectCases } from 'src/app/store/Case/case.selector';
import { fetchCaseData } from 'src/app/store/Case/case.action';
import { cloneDeep } from 'lodash';
import { fetchagentData } from 'src/app/store/Agent/agent.action';
import { selectagentData } from 'src/app/store/Agent/agent-selector';
import { addtaskData, deletetaskData } from 'src/app/store/Task/task.action';
import { TaskService } from 'src/app/core/services/case/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {


  // bread crumb items
  breadCrumbItems!: Array<{}>;
  endItem: any
  customers: any;
  taskForm!: UntypedFormGroup;
  submitted: boolean = false;
  public Editor = ClassicEditor;
  term: any;
  Customerlist: any;
  agentsList: any[] = [];
  deleteId: any;

  assignedAgents: any[] = [];
  action: string = '';

  tasksPassed: any[] = [];
  tasksNotPassed: any[] = [];
  selectedTask: any;


  @ViewChild('showModal', { static: false }) showModal?: ModalDirective;
  @ViewChild('deleteRecordModal', { static: false }) deleteRecordModal?: ModalDirective;

  customerdetail: any;
  isFirstOpen = true

  priorities!: any[];
  casesList!: any[];

  
  constructor(private formBuilder: FormBuilder, public store: Store, private taskService: TaskService) {
    this.priorities = ['Low', 'Medium', 'High', 'Urgent'];
  }

  ngOnInit(): void {
    /**
     * BreadCrumb
     */
    this.breadCrumbItems = [
      { label: 'Case', active: true },
      { label: 'Tasks', active: true }
    ];

    // this.taskService.getTasksByUserId().subscribe((data) => {
    //   console.log(data, 'fetchData');
    // }
    // );


    this.taskService.getTaskByUserIdAndDueDateNotPassed().subscribe((data) => {
      this.tasksNotPassed = data;
      this.selectedTask = data[0];
      console.log(data, 'tasksNotPassed');
    }
    );

    this.taskService.getTaskByUserIdAndDueDatePassed().subscribe((data) => {
      this.tasksPassed = data;
      console.log(data, 'tasksPassed');
    }
    );

    this.store.dispatch(fetchCaseData());
    this.store.select(selectCases).subscribe((data) => {
      this.casesList = data;
      console.log(data, 'casesList');
    });

    this.store.dispatch(fetchagentData());
    this.store.select(selectagentData).subscribe((data) => {
      this.agentsList = data.map((element: any) => {
        return { ...element, checked: '0', fullName: element.firstName + ' ' + element.lastName }
      });
    });


    // Fetch Data
    setTimeout(() => {
      this.store.dispatch(fetchcustomerData());
      this.store.select(selectData).subscribe((data) => {
        this.customers = data;
        this.Customerlist = data;
        this.customers = this.Customerlist.slice(0, 10);
        this.customerdetail = this.customers[0]
      })
      document.getElementById('elmLoader')?.classList.add('d-none')
    }, 100)

    /**
      * Form Validation
      */
    this.taskForm = this.formBuilder.group({
      case: ['Select case', [Validators.required]],
      name: ['', [Validators.required]],
      dueDate: ['', [Validators.required]],
      priority: ['Select priority', [Validators.required]],
      description: ['', [Validators.required]],
      agent: ['Select agent', [Validators.required]],
    });
  }

  get formValue() {
    return this.taskForm.controls;
  }

  selectTask(data: any) {
    this.selectedTask = data;
    console.log(data, 'selectedTask');
  }


  // Edit Customer
  editCustomer(id: any) {
    this.showModal?.show()
    var modaltitle = document.querySelector('.modal-title') as HTMLAreaElement
    modaltitle.innerHTML = 'Edit Customer'
    var modalbtn = document.getElementById('add-btn') as HTMLAreaElement
    modalbtn.innerHTML = 'Update'
    document.querySelectorAll('#customer-img').forEach((element: any) => {
      element.src = this.customers[id].img;
    });
    this.taskForm.controls['img'].setValue(this.customers[id].img);
    this.taskForm.patchValue(this.customers[id]);
  }

  // Add Customer
  saveTask() {

    if (this.action === 'Add') {

      this.store.dispatch(addtaskData({
        taskData: {
          "name": this.taskForm.value['name'],
          "dueDate": this.taskForm.value['dueDate'],
          "description": this.taskForm.value['description'],
          "priority": this.taskForm.value['priority'],
          "status": "Incomplete",
          "concernedCase": this.taskForm.value['case'].id,
          "assignedUser": "66a0e7f1a6f8fa4ee922fbd2"
        }
      }));

        this.taskService.getTaskByUserIdAndDueDateNotPassed().subscribe((data) => {
          this.tasksNotPassed = data;
          this.selectedTask = data[0];
          console.log(data, 'tasksNotPassed');
        }
        );

        this.taskService.getTaskByUserIdAndDueDatePassed().subscribe((data) => {
          this.tasksPassed = data;
          this.selectedTask = data[0];
          console.log(data, 'tasksPassed');
        }
        );

      this.showModal?.hide();
    }

    if (this.action === 'Edit') {
      this.showModal?.hide();
    } else {
      this.showModal?.hide();
    }
  }

  openAddModal() {
    // this.name = '';
    this.action = 'Add';
    this.taskForm.reset();
    this.showModal?.show();
  }

  confirmDelete() {

    this.store.dispatch(deletetaskData({ id: this.selectedTask.id.toString() }));
    this.tasksNotPassed = this.tasksNotPassed.filter((element: any) => element.id !== this.selectedTask.id);

    this.deleteRecordModal?.hide();
    // this.masterSelected = false
  }



  // File Upload
  imageURL: string | undefined;
  fileChange(event: any) {
    let fileList: any = event.target as HTMLInputElement;
    let file: File = fileList.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
      document.querySelectorAll('#customer-img').forEach((element: any) => {
        element.src = this.imageURL;
      });
      this.taskForm.controls['img'].setValue(this.imageURL);
    };
    reader.readAsDataURL(file);
  }

  // Delete Customer
  removeCustomer(id: any) {
    this.deleteId = id;
    this.deleteRecordModal?.show()
  }

  deleteCustomer() {
    this.store.dispatch(deletecustomerData({ id: this.deleteId }));
    this.deleteRecordModal?.hide()
  }

  // follow unfollow button
  followbtn(ev: any) {
    ev.target.closest('button').classList.toggle('active')
  }

  // filterdata
  filterdata() {
    if (this.term) {
      this.customers = this.Customerlist.filter((el: any) => el.email.toLowerCase().includes(this.term.toLowerCase()) || el.name.toLowerCase().includes(this.term.toLowerCase()))
    } else {
      this.customers = this.Customerlist.slice(0, 10);
    }
    // noResultElement
    this.updateNoResultDisplay();
  }
  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    this.endItem = event.page * event.itemsPerPage;
    this.customers = this.Customerlist.slice(startItem, this.endItem);
  }

  // no result 
  updateNoResultDisplay() {
    const noResultElement = document.querySelector('.noresult') as HTMLElement;
    const paginationElement = document.getElementById('pagination-element') as HTMLElement
    if (this.term && this.customers.length === 0) {
      noResultElement.style.display = 'block';
      paginationElement.classList.add('d-none')
    } else {
      noResultElement.style.display = 'none';
      paginationElement.classList.remove('d-none')
    }
  }

  updateTaskStatus(id: any) {
    this.taskService.updateTaskStatus(id).subscribe((data) => {
      console.log(data, 'updateTaskStatus');
      this.tasksNotPassed = this.tasksNotPassed.map((element: any) => {
        if (element.id === id) {
          element.status = data.status;
        }
        return element;
      });

      this.tasksPassed = this.tasksPassed.map((element: any) => {
        if (element.id === id) {
          element.status = data.status;
        }
        return element;
      });
    });
  }

  selectstatus() {
    const status = (document.getElementById("idStatus") as HTMLInputElement).value
    if (status) {
      this.customers = this.Customerlist.filter((data: any) => {
        return data.status == status
      })
    }
    else {
      this.customers = this.Customerlist.slice(0, 10);
    }
  }

  // view customer detail
  viewCustomer(id: any) {
    this.customerdetail = this.customers[id]
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

    console.log(this.assignedAgents, 'assignedAgents');
  }
}
