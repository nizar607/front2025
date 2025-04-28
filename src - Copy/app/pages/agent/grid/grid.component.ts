import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Store } from '@ngrx/store';
import {
  addagentData, addagentDataFailure,
  addagentDataSuccess,
  deleteagentData,
  fetchagentData,
  updateagentData, uploadImage
} from 'src/app/store/Agent/agent.action';
import { selectagentData } from 'src/app/store/Agent/agent-selector';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { passwordMatchValidator } from 'src/app/core/shared/SharedForm';
import { NGXLogger } from "ngx-logger";
import { AgentModel } from "../../../store/Agent/agent.model";
import { AgentService } from 'src/app/core/services/agent/agent.service';


@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {

  imageChangedEvent: Event | null = null;
  croppedImage: SafeUrl = '';

  breadCrumbItems!: Array<{}>;
  agents: AgentModel[] = [];
  agentForm!: FormGroup;
  submitted = false;
  masterSelected!: boolean;
  agentlist: any;
  bedroom: any;
  searchTerm!: string;
  formUtils: {
    agentData: AgentModel | null,
    action: string
  } = { agentData: null, action: '' };

  action!: string;
  imageTest: any;

  @ViewChild('addAgent', { static: false }) addAgent?: ModalDirective;
  @ViewChild('deleteRecordModal', { static: false }) deleteRecordModal?: ModalDirective;
  deleteID: any;
  editData: any;

  accesses = [
    
    'MEETING_FETCH',
    'MEETING_UPDATE',
    'MEETING_CREATE',
    'MEETING_DELETE',

    'CASE_FETCH',
    'CASE_UPDATE',
    'CASE_CREATE',
    'CASE_DELETE',

    'DOCUMENT_FETCH',
    'DOCUMENT_UPDATE',
    'DOCUMENT_CREATE',
    'DOCUMENT_DELETE',

    'INVOICE_FETCH',
    'INVOICE_CREATE',
    'INVOICE_DELETE',
    'INVOICE_UPDATE',

    'COURT_FETCH',
    'COURT_CREATE',
    'COURT_DELETE',
    'COURT_UPDATE',
  ];

  imageURL: any;
  file!: File;
  previewUrl: SafeUrl | null = null;

  constructor(
    private formBuilder: UntypedFormBuilder,
    public store: Store,
    private sanitizer: DomSanitizer,
    private logger: NGXLogger,
    private agentService: AgentService
  ) {
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.agentForm.patchValue({
        image: file
      });
    }
  }

  fetchAgentsList() {
    this.store.dispatch(fetchagentData());
    this.store.select(selectagentData).subscribe((data) => {
      this.agentlist = data;
      this.agents = this.agentlist.slice(0, 10);
    });
  }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Agents', active: true },
      { label: 'Agent Grid', active: true }
    ];

    this.agentForm = this.formBuilder.group({
      id: ['', []],
      firstName: ['agent99', [Validators.required, Validators.minLength(3)]],
      lastName: ['agent99', [Validators.required, Validators.minLength(3)]],
      email: ['agent99@gmail.com', [Validators.required, Validators.email]],
      password: ['Agent@123', [
        Validators.required, Validators.minLength(6),
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)]
      ],
      confirmPassword: ['Agent@123', [Validators.required]],
      address: ['ariana', [Validators.required]],
      phoneNumber: ['20202020', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      accesses: [["MEETING_FETCH"], [Validators.required]],
      image: [null, [Validators.required]],
    }, {
      validators: passwordMatchValidator('password', 'confirmPassword')
    });


    setTimeout(() => {
      this.fetchAgentsList();
      document.getElementById('elmLoader')?.classList.add('d-none');
    }, 1000);

    setTimeout(() => {
      console.log("this.agentlist ", this.agentlist);

    }, 3000);
  }

  get formValue() {
    return this.agentForm.controls;
  }

  editAgentModal(agent: AgentModel) {
    this.formUtils.agentData = agent;
    this.formUtils.action = 'edit';

    this.addAgent?.show();
    this.agentForm.patchValue({ ...agent, password: "", confirmPassword: "" });
  }

  addAgentModal() {
    this.formUtils.action = 'add';
    this.addAgent?.show();
    this.agentForm.reset();
  }

  fileChangeEvent(event: Event): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl + "");

    // Convert Blob to File
    const file = new File([event.blob!], "croppedImage.png", { type: event.blob!.type });

    this.agentForm.patchValue({
      image: file
    });
  }

  imageLoaded(image: LoadedImage) {
    // show cropper
  }

  cropperReady() {
    // Cropper ready
  }

  loadImageFailed() {
    // Load failed
  }


  saveProperty() {
    if (this.agentForm.valid) {
      const formData = new FormData();
      const imageFile = this.agentForm.get('image')?.value;
      formData.append('id', this.agentForm.get('id')?.value);
      formData.append('file', imageFile);
      formData.append('firstName', this.agentForm.get('firstName')?.value);
      formData.append('lastName', this.agentForm.get('lastName')?.value);
      formData.append('email', this.agentForm.get('email')?.value);
      const password = this.agentForm.get('password')?.value;
      if (password) {
        formData.append('password', password);
      }
      formData.append('phoneNumber', this.agentForm.get('phoneNumber')?.value);
      formData.append('address', this.agentForm.get('address')?.value);
      formData.append('accesses', this.agentForm.get('accesses')?.value);

      if (imageFile instanceof File) {

        if (this.formUtils.action === 'add') {
          this.store.dispatch(addagentData({ newData: formData }));
        }

      } else {
        console.error('The image field does not contain a valid File object.');
        return;
      }


      this.addAgent?.hide();
      this.agentForm.reset();
      this.submitted = true;
    }

    if (this.formUtils.action === 'edit') {

      const formData = new FormData();
      const imageFile = this.agentForm.get('image')?.value;
      formData.append('id', this.agentForm.get('id')?.value);
      formData.append('file', imageFile);
      formData.append('firstName', this.agentForm.get('firstName')?.value);
      formData.append('lastName', this.agentForm.get('lastName')?.value);
      formData.append('email', this.agentForm.get('email')?.value);
      if (this.agentForm.get('password')?.value?.length > 0) {
        const password = this.agentForm.get('password')?.value;
        if (password) {
          formData.append('password', password);
        }
      }
      formData.append('phoneNumber', this.agentForm.get('phoneNumber')?.value);
      formData.append('address', this.agentForm.get('address')?.value);
      formData.append('accesses', this.agentForm.get('accesses')?.value);


      if (this.formUtils.action === 'edit') {
        console.log("formData ", this.agentForm.value);
        this.agentService.updateData(formData).subscribe((data) => {
          this.fetchAgentsList();
        });
      }

      this.addAgent?.hide();
      this.agentForm.reset();
      this.submitted = true;
    }

  }


  removeItem(id: any) {
    this.deleteID = id;
    this.deleteRecordModal?.show();
  }

  confirmDelete() {
    console.log("this.deleteID ", this.deleteID);
    this.store.dispatch(deleteagentData({ id: this.deleteID.toString() }));
    this.deleteRecordModal?.hide();
  }

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.agents = this.agentlist.slice(startItem, endItem);
  }

  selectstatus() {
    const status = (document.getElementById("status-input") as HTMLInputElement).value;
    if (status) {
      this.agents = this.agentlist.filter((data: any) => {
        return data.status == status;
      });
    } else {
      this.agents = this.agentlist.slice(0, 10);
    }
  }

  searchResults: any;

  performSearch(): void {
    console.log("this.searchTerm ", this.searchTerm);
    this.searchResults = this.agentlist.filter((item: any) => {
      return item.firstName.toLowerCase().includes(this.searchTerm.toLowerCase())
        || item.lastName.toLowerCase().includes(this.searchTerm.toLowerCase())
        || item.email.toLowerCase().includes(this.searchTerm.toLowerCase());
    });
    this.agents = this.searchResults.slice(0, 10);
    this.updateNoResultDisplay();
  }

  updateNoResultDisplay() {
    const noResultElement = document.getElementById('noresult') as HTMLElement;
    const paginationElement = document.getElementById('pagination-element') as HTMLElement;

    if (this.searchResults && this.agents.length == 0) {
      noResultElement.style.display = 'block';
      paginationElement.classList.add('d-none');
    } else {
      noResultElement.style.display = 'none';
      paginationElement.classList.remove('d-none');
    }
  }
}
