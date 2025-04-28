import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { Validators } from 'ngx-editor';
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { fetchSelectedCaseData, fetchSelectedCaseDataSuccess } from "../../../store/Case/case.action";
import { selectDataLoading, selectSelectedData } from "../../../store/Case/case.selector";
import { addPhaseData, fetchSelectedPhaseData } from 'src/app/store/Phase/phase.action';
import { InvoiceService } from 'src/app/core/services/invoice/invoice.service';
import { TaskService } from 'src/app/core/services/case/task.service';
import { CaseService } from 'src/app/core/services/case/case.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {


  // bread crumb items
  breadCrumbItems!: Array<{}>;
  reviewForm!: UntypedFormGroup;
  reviewData: any;
  submitted: boolean = false;
  deleteId: any;
  files: File[] = [];
  rate: any;
  currentTab = 'description';
  selectedCase: any;
  loading: boolean = true;
  action: string = '';
  selectedPhasesList!: any[];
  masterSelected!: boolean;
  invoices: any;
  invoiceslist: any
  caseId !: string;
  
  tasksPassed: any[] = [];
  tasksNotPassed: any[] = [];
  selectedTask: any;

  selectedStatus!: string;

  PhaseForm!: FormGroup;

  @ViewChild('addReview', { static: false }) addReview?: ModalDirective;
  @ViewChild('removeItemModal', { static: false }) removeItemModal?: ModalDirective;

  @ViewChild('addPhase', { static: false }) addPhase?: ModalDirective;

  // @ViewChild('deleteRecordModal', {static: false}) deleteRecordModal?: ModalDirective;

  constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, public store: Store, private invoiceService: InvoiceService, private router: Router,
    private taskService: TaskService, private caseService: CaseService) {
    {
      console.log('Selected Case: ', this.selectedCase);
    }
  }


  ngOnInit(): void {
    /**
     * BreadCrumb
     */
    this.breadCrumbItems = [
      { label: 'Cases', active: true },
      { label: 'Overview', active: true }
    ];


    const id: string = this.activatedRoute.snapshot.paramMap.get('id')!;
    this.caseId = id;

    this.store.dispatch(fetchSelectedPhaseData({ id: id }));

    this.store.select(selectDataLoading).subscribe((isLoading) => {
      this.loading = isLoading;
    });

    this.store.dispatch(fetchSelectedCaseData({ id: id }));
    this.store.select(selectSelectedData).subscribe((data) => {
      console.log("case ", data);
      this.selectedCase = data;
      this.selectedStatus = data?.status || '';
    });

    this.PhaseForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      startDate: ['', [Validators.required]],
      endDate: ['']
    });

    this.invoiceService.getInvoiceByCaseId(this.caseId).subscribe((data) => {
      this.invoices = data;
      this.invoiceslist = data;
      this.invoices = this.invoiceslist.slice(0, 10)

      console.log('this.invoices', this.invoices)

    }
    )

    this.reviewForm = this.formBuilder.group({
      _id: [''],
      title: ['', [Validators.required]],
      content: ['', [Validators.required]],
      rate: ['', [Validators.required]],
      img: ['']
    });

    
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

  }

  changeStatus() {
    this.selectedCase = {...this.selectedCase, status : this.selectedStatus};
    

    this.caseService.updateStatus(this.selectedCase.id, this.selectedStatus).subscribe((data) => {
      console.log('Status Updated Successfully' + data);
      this.selectedCase = data;
    });
  }

  checkedValGet: any[] = [];
  checkUncheckAll(ev: any) {
    this.invoices = this.invoices.map((x: { states: any }) => ({ ...x, states: ev.target.checked }));

    var checkedVal: any[] = [];
    var result;
    for (var i = 0; i < this.invoices.length; i++) {
      if (this.invoices[i].states == true) {
        result = this.invoices[i].id;
        checkedVal.push(result);
      }
    }

    this.checkedValGet = checkedVal;
    checkedVal.length > 0 ? document.getElementById("remove-actions")?.classList.remove('d-none') : document.getElementById("remove-actions")?.classList.add('d-none');
  }

  // Sort Data
  direction: any = 'asc';
  onSort(column: any) {
    if (this.direction == 'asc') {
      this.direction = 'desc';
    } else {
      this.direction = 'asc';
    }
    const sortedArray = [...this.invoices]; // Create a new array
    sortedArray.sort((a, b) => {
      const res = this.compare(a[column], b[column]);
      return this.direction === 'asc' ? res : -res;
    });
    this.invoices = sortedArray;
  }
  compare(v1: string | number, v2: string | number) {
    return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
  }

  onCheckboxChange(e: any) {
    var checkedVal: any[] = [];
    var result
    for (var i = 0; i < this.invoices.length; i++) {
      if (this.invoices[i].states == true) {
        result = this.invoices[i].id;
        checkedVal.push(result);
      }
    }
    this.checkedValGet = checkedVal
    checkedVal.length > 0 ? document.getElementById("remove-actions")?.classList.remove('d-none') : document.getElementById("remove-actions")?.classList.add('d-none');
  }

  // Delete Product
  removeItem(id: any) {
  }


  public dropzoneConfig: DropzoneConfigInterface = {
    clickable: true,
    addRemoveLinks: true,
    previewsContainer: false,
  };

  uploadedFiles: any[] = [];

  // File Upload
  profile: any = [];

  onUploadSuccess(event: any) {
    setTimeout(() => {
      this.uploadedFiles.push(event[0]);
      this.profile.push(event[0].dataURL)
      this.reviewForm.controls['img'].setValue(this.uploadedFiles);
    }, 0);
  }

  // Change Tab Content
  changeTab(tab: string) {
    this.currentTab = tab;
  }


  // File Remove
  removeFile(event: any) {
    this.uploadedFiles.splice(this.uploadedFiles.indexOf(event), 1);
  }

  // open & close chatbox
  openchatbox() {
    document.getElementById('emailchat-detailElem')?.classList.add('d-block')
  }

  closechatbox() {
    document.getElementById('emailchat-detailElem')?.classList.remove('d-block')
  }

  // Edit Review
  editReview(id: any) {
    this.uploadedFiles = []
    this.addReview?.show()
    this.reviewForm.controls['_id'].setValue(this.reviewData[id].id);
    this.reviewForm.controls['title'].setValue(this.reviewData[id].title);
    this.reviewForm.controls['rate'].setValue(this.reviewData[id].rating);
    this.reviewForm.controls['content'].setValue(this.reviewData[id].content);
    this.reviewData[id].profile.forEach((element: any) => {
      this.uploadedFiles.push({ 'dataURL': element, 'name': 'image', 'size': 1024, });
    });
    this.reviewForm.controls['img'].setValue(this.uploadedFiles);

  }

  // Add Review
  saveReview() {
    if (this.reviewForm.valid) {
      if (this.reviewForm.get('_id')?.value) {
        // this.reviewData = reviews.map((order: { id: any; }) => order.id === this.reviewForm.get('_id')?.value ? { ...order, ...this.reviewForm.value } : order);
      } else {
        const title = this.reviewForm.get('title')?.value;
        const rating = this.reviewForm.get('rate')?.value;
        const content = this.reviewForm.get('content')?.value;
        const profile = this.reviewForm.get('img')?.value;

        this.reviewData.push({
          id: this.reviewData.length + 1,
          rating,
          title,
          content,
          date: '',
          user: '',
          profile: this.profile
        })
      }
      this.addReview?.hide()
      this.reviewForm.reset();
      this.uploadedFiles = [];
      this.profile = [];
    }
    this.submitted = true

  }

  // Delete Review
  removeReview(id: any) {
    this.deleteId = id
    this.removeItemModal?.show()
  }

  DeleteReview() {
    this.reviewData.splice(this.deleteId, 1)
    this.removeItemModal?.hide()
  }

  protected readonly screenLeft = screenLeft;


  openAddPhaseModal() {
    this.action = 'Add';
    this.addPhase?.show();
  }


  savePhase() {
    if (this.action === 'Add') {


      const name = this.formValue['name'].value;
      const description = this.formValue['description'].value;
      const startDate = this.formValue['startDate'].value;
      const endDate = this.formValue['endDate'].value;

      const concernedCase = this.selectedCase.id;

      const newPhase = {
        name,
        description,
        startDate,
        endDate,
        concernedCase
      };
      console.log('newPhase : ', newPhase);

      this.store.dispatch(addPhaseData({ newData: newPhase }));

    }

    if (this.action === 'Edit') {

    }

    this.addPhase?.hide();
  }

  get formValue() {
    return this.PhaseForm.controls;
  }

}
