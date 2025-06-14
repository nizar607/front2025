import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Store } from '@ngrx/store';
import {
  addcategoryData,
  deletecategoryData,
  fetchcategoryData,
  updatecategoryData,
} from 'src/app/store/Category/category.action';
import { selectcategoryData } from 'src/app/store/Category/category-selector';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { document } from "ngx-bootstrap/utils";
import { HttpClient } from '@angular/common/http';
import { CategoryService } from 'src/app/core/services/category/category.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';



@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {


  @ViewChild('deleteModal', { static: false }) deleteModal?: ModalDirective;
  @ViewChild('addModal', { static: false }) addModal?: ModalDirective;

  croppedImage: SafeUrl = '';
  imageChangedEvent: Event | null = null;
  breadCrumbItems!: Array<{}>;



  formUtils: {
    categoryData: any | null,
    action: string
  } = { categoryData: null, action: '' };

  currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  accesses: any = [];

  categoryForm!: FormGroup;
  categoryList: any = [];
  categories: any = [];

  deleteID: any;
  editData: any;


  imageURL: any;
  file!: File;
  previewUrl: SafeUrl | null = null;


  searchResults: any;
  searchTerm!: string;
  searchCategoryTerm!: string;
  itemsPerPage = 10;


  constructor(
    private formBuilder: UntypedFormBuilder,
    public store: Store,
    private sanitizer: DomSanitizer,
  ) {

  }


  fetchCategoryList() {
    this.store.dispatch(fetchcategoryData());
    this.store.select(selectcategoryData).subscribe((data) => {
      this.categoryList = data;
      console.log("data ", data);
      this.categories = this.categoryList.slice(0, this.itemsPerPage);
      console.log("categoryList ", this.categoryList);
    });
  }


  ngOnInit(): void {
    this.searchCategoryTerm = "none";
    this.fetchCategoryList();
    document.getElementById('elmLoader')?.classList.add('d-none');



    this.breadCrumbItems = [
      { label: 'Categories', active: true },
      { label: 'Category Grid', active: true }
    ];

    this.categoryForm = this.formBuilder.group({
      id: ['', []],
      name: ['category1', [Validators.required, Validators.minLength(3)]],
      description: ['category1 description', [Validators.required, Validators.minLength(3)]],
    });

  }


  get formValue() {
    return this.categoryForm.controls;
  }


  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl + "");

    // Convert Blob to File
    const file = new File([event.blob!], "croppedImage.png", { type: event.blob!.type });

    this.categoryForm.patchValue({
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

  fileChangeEvent(event: Event): void {
    this.imageChangedEvent = event;
  }



  addCategory() {
    this.formUtils.action = 'add';
    this.addModal?.show();
    this.categoryForm.reset();
  }



  editCategory(category: any) {
    this.formUtils.categoryData = category;
    console.log("edit category ", category);
    this.formUtils.action = 'edit';

    this.addModal?.show();
    this.editData = category;
    this.categoryForm.patchValue({ ...category });
  }


  /* ************** CRUD ***************** */



  /* ************** HELPER ***************** */

  /* ************** ADD ***************** */
  saveCategory() {
    const categoryData = this.categoryForm.value;

    if (this.formUtils.action === 'edit') {

      if (this.categoryForm.valid) {
        console.log("edit ", this.editData);
        this.store.dispatch(updatecategoryData({ id: this.editData.id, updatedData: categoryData }));
      }

    } else {
      if (this.formUtils.action === 'add') {
        if (this.categoryForm.valid) {
          console.log("add");
          this.store.dispatch(addcategoryData({ newData: categoryData }));
        }
      }
    }

    this.addModal?.hide();
    this.categoryForm.reset();
  }
  /* ************** ADD ***************** */

  /* ************** DELETE ***************** */
  deleteCategory(id: any) {
    this.deleteID = id;
    this.deleteModal?.show();
  }

  confirmDelete() {
    console.log("this.deleteID ", this.deleteID);
    this.store.dispatch(deletecategoryData({ id: this.deleteID.toString() }));
    this.deleteModal?.hide();
  }
  /* ************** DELETE ***************** */

  /* ************** EDIT ***************** */
  editModal(category: any) {
    this.formUtils.categoryData = category;
    console.log("category ", category);
    this.formUtils.action = 'edit';

    this.addModal?.show();
    this.editData = category;
    this.categoryForm.patchValue({ ...category });
  }
  /* ************** EDIT ***************** */


  /* ************** CRUD ***************** */



  pageChanged(event
    :
    PageChangedEvent
  ):
    void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.categories = this.categoryList.slice(startItem, endItem);
  }

  selectstatus() {
    const courtType = (document.getElementById("status-input") as HTMLInputElement).value;
    if (courtType) {
      this.categories = this.categoryList.filter((data: any) => {
        return data.type == courtType;
      });
    } else {
      this.categories = this.categoryList.slice(0, 10);
    }
  }



  performSearch(): void {

    console.log("this.searchTerm ", this.searchTerm);
    this.searchResults = this.categoryList.filter((item: any) => {
      return item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        || item.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    });
    this.categories = this.searchResults.slice(0, 10);
    this.updateNoResultDisplay();
  }

  searchByCategory(): void {
    if (this.searchCategoryTerm == "none") {
      this.categories = this.categoryList.slice(0, 10);
      return;
    }
    console.log("this.searchTerm ", this.searchCategoryTerm);
    this.searchResults = this.categoryList.filter(
      (item: any) => item.category == this.searchCategoryTerm);

    this.categories = this.searchResults.slice(0, 10);
    this.updateNoResultDisplay();
  }

  updateNoResultDisplay() {
    const noResultElement = document.getElementById('noresult') as HTMLElement;
    const paginationElement = document.getElementById('pagination-element') as HTMLElement;

    if (this.searchResults && this.categories.length == 0) {
      noResultElement.style.display = 'block';
      paginationElement.classList.add('d-none');
    } else {
      noResultElement.style.display = 'none';
      paginationElement.classList.remove('d-none');
    }
  }

  formatType(type: string) {
    return type.replaceAll("_", " ");
  }




  checkedValGet: any[] = [];

  onCheckboxChange(e: any) {
    var checkedVal: any[] = [];
    var result
    for (var i = 0; i < this.categories.length; i++) {
      if (this.categories[i].state == true) {
        result = this.categories[i].id;
        checkedVal.push(result);
      }
    }
    this.checkedValGet = checkedVal
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
    const sortedArray = [...this.categories]; // Create a new array
    sortedArray.sort((a, b) => {
      const res = this.compare(a[column], b[column]);
      return this.direction === 'asc' ? res : -res;
    });
    this.categories = sortedArray;
  }

  compare(v1: string | number, v2: string | number) {
    return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
  }

  masterSelected!: boolean;
  // The master checkbox will check/ uncheck all items
  checkUncheckAll(ev: any) {
    this.categories.forEach((x: { state: any; }) => x.state = ev.target.checked)
    var checkedVal: any[] = [];
    var result
    for (var i = 0; i < this.categories.length; i++) {
      if (this.categories[i].state == true) {
        result = this.categories[i].id;
        checkedVal.push(result);
      }
    }
    this.checkedValGet = checkedVal
    checkedVal.length > 0 ? document.getElementById("remove-actions")?.classList.remove('d-none') : document.getElementById("remove-actions")?.classList.add('d-none');
  }



}
