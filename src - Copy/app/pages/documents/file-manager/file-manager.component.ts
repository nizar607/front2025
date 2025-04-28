import { Component, QueryList, ViewChildren } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { UntypedFormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';

import { filemanagerModel } from './file-manager.model';
import { fliedata, folder, fliefolder, filerecent } from './data';
import { NGXLogger } from "ngx-logger";
import { HttpClient } from "@angular/common/http";
import { Store } from '@ngrx/store';
import { fetchCaseData } from 'src/app/store/Case/case.action';
import { selectData as selectCases } from 'src/app/store/Case/case.selector';
import { selectdocumentsData as selectDocuments } from 'src/app/store/Document/document-selector';
import { addDocumentData, deletedocumentData, fetchDocumentsByCase } from 'src/app/store/Document/document.action';

@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.scss'],
  providers: [DecimalPipe]
})
export class FileManagerComponent {

  folderData: any;
  fileList!: Observable<filemanagerModel[]>;
  fliefolders: any;
  storageChart: any;
  sortValue: any = "Docs Type";
  files: File[] = [];
  endItem: any;
  file: any;

  testFile !: File;
  selectedCase: any = null;
  documents: any = [];

  isFileOver = false;
  isFileUploaded = false;

  pdf = {
    type: 'pdf',
    color: 'danger',
    icon: 'bi bi-filetype-pdf',
    num: 0,
  }

  images = {
    type: 'image',
    color: 'success',
    icon: 'bi bi-images',
    num: 0,
  }

  video = {
    type: 'video',
    color: 'secondary',
    icon: 'bi bi-camera-reels',
    num: 0,
  }

  docs = {
    type: 'docs',
    color: 'primary',
    icon: 'bi bi-filetype-doc',
    num: 0,
  }

  other = {
    type: 'other',
    color: 'secondary',
    icon: 'bi bi-file-earmark-text',
    num: 0,
  }









  onFileSelected(event: any): void {
    const file = event.target.files[0];
    this.testFile = file;
  }

  fillFilesTypes(): void {
    this.pdf.num = 0;
    this.images.num = 0;
    this.video.num = 0;
    this.docs.num = 0;
    this.other.num = 0;

    this.documents.forEach((doc: any) => {
      if (doc.fileType.match('pdf'))
        this.pdf.num++;
      else
        if (doc.fileType.match('psd'))
          this.images.num++;
        else
          if (doc.fileType.match('mp4'))
            this.video.num++;
          else
            if (doc.fileType.match('image'))
              this.images.num++;
            else
              if (doc.fileType.match('text') || doc.fileType.match('doc'))
                this.docs.num++;
              else
                this.other.num++;
    });
  }

  onCaseSelected(_case: any): void {
    this.selectedCase = _case;
    this.documents = this.selectedCase.documents || [];
    this.fillFilesTypes();
    this.store.dispatch(fetchDocumentsByCase({ caseId: this.selectedCase.id }));
    console.log("case selected ", this.selectedCase);
  }


  uploadedFiles: any[] = [];

  // File Upload
  imageURL: any;


  constructor(
    private formBuilder: UntypedFormBuilder,
    private logger: NGXLogger,
    public store: Store,
    private http: HttpClient
  ) {
  }

  currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  accesses: any = [];


  ngOnInit(): void {

    this.http.get('http://localhost:8080/api/agent/accesses/' + this.currentUser.email).subscribe((data: any) => {
      this.accesses = data;
      console.log('accesses : ', data);
    });


    document.body.classList.add('file-detail-show');

    // Folder Data Fetch
    this.file = fliedata;
    this.store.dispatch(fetchCaseData());
    this.store.select(selectCases).subscribe((data) => {
      if (data.length > 0) {
        this.folderData = data;
        this.selectedCase = this.folderData[0];
        //this.recentDatas = this.selectedCase.documents || [];
        this.store.dispatch(fetchDocumentsByCase({ caseId: this.selectedCase.id }));
      }
    });

    this.store.select(selectDocuments).subscribe((data) => {
      if (data) {
        this.documents = data;
        this.fillFilesTypes();
      }
    });

    this.fliefolders = fliefolder;

  }


  fileChangeEvent(event: Event): void {
    const file = (event.target as HTMLInputElement).files![0];
    console.log("file selected ", file);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('caseId', this.selectedCase.id);
    console.log("formData ", formData);
    this.store.dispatch(addDocumentData({ newData: formData }));

    this.isFileUploaded = true;

    setTimeout(() => {
      this.isFileUploaded = false;
    }, 1200);
  }

  // File Remove
  removeFile(event: any) {
    this.uploadedFiles.splice(this.uploadedFiles.indexOf(event), 1);
  }

  // File Download
  downloadFile(data: any): void {
    const a = document.createElement('a');
    a.href = `http://localhost:8080/api/documents/download/${data.url}`;
    a.download = `http://localhost:8080/api/documents/download/${data.url}`;  // Set the file name for download
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

  }

  deleteFile(data: any): void {
    this.store.dispatch(deletedocumentData({ id: data.id }));
  }




  direction: any = 'asc';
  sortKey: any = '';

  sortBy(column: any, value: any) {
    this.sortValue = value;
    this.onSort(column)
  }

  onSort(column: any) {
    if (this.direction == 'asc') {
      this.direction = 'desc';
    } else {
      this.direction = 'asc';
    }
    const sortedArray = [...this.documents]; // Create a new array
    sortedArray.sort((a, b) => {
      const res = this.compare(a[column], b[column]);
      return this.direction === 'asc' ? res : -res;
    });
    this.documents = sortedArray;
  }

  compare(v1: string | number, v2: string | number) {
    return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
  }

  // Pagination
  pageChanged(event: any): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    this.endItem = event.page * event.itemsPerPage;
    this.documents = filerecent.slice(startItem, this.endItem);
  }

  determineColor(type: string): string {
    if (type.match('pdf'))
      return 'danger';
    if (type.match('psd'))
      return 'primary';
    if (type.match('mp4'))
      return 'warning';
    if (type.match('image'))
      return 'success';
    if (type.match('text'))
      return 'info';
    return 'other'

  }

  filterDocuments(type: string): void {

    console.log(this.selectedCase.documents)
    if (type === 'all') {
      this.documents = this.selectedCase.documents || [];
    }

    else if (type === 'doc') {
      this.documents = this.selectedCase.documents.filter((doc: any) => doc.fileType.match('text') || doc.fileType.match('doc') || doc.fileType.match('pdf'));
    }
    else if (type === 'media') {
      console.log("image")
      this.documents = this.selectedCase.documents.filter((doc: any) => doc.fileType.match('image') || doc.fileType.match('video'));
    }
  }

}
