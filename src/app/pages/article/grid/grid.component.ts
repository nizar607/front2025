import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Store } from '@ngrx/store';
import {
  addarticleData,
  deletearticleData,
  fetcharticleData,
  updatearticleData,
} from 'src/app/store/Article/article.action';
import { selectarticleData } from 'src/app/store/Article/article-selector';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { document } from "ngx-bootstrap/utils";
import { HttpClient } from '@angular/common/http';
import { ArticleService } from 'src/app/core/services/article/article.service';
import { CategoryService } from 'src/app/core/services/category/category.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { fetchcategoryData } from 'src/app/store/Category/category.action';
import { selectcategoryData } from 'src/app/store/Category/category-selector';


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
    articleData: any | null,
    action: string
  } = { articleData: null, action: '' };

  currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  accesses: any = [];

  articleForm!: FormGroup;
  articleList: any = [];
  articles: any = [];

  deleteID: any;
  editData: any;

  categoryList: any = [];


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
    private articleService: ArticleService,
    private categoryService: CategoryService,
    private sanitizer: DomSanitizer,
    // private http: HttpClient,
  ) {
  }


  fetchArticleList() {

    this.store.dispatch(fetcharticleData());
    this.store.select(selectarticleData).subscribe((data) => {
      this.articleList = data;
      console.log("data ", data);
      this.articles = this.articleList.slice(0, this.itemsPerPage);
      console.log("articleList ", this.articleList);
    });
  }

  fetchCategoryList() {
    this.store.dispatch(fetchcategoryData());
    this.store.select(selectcategoryData).subscribe((data) => {
      this.categoryList = data.map((item: any) => { return { name: item.name, value: item.id } });
      document.getElementById('elmLoader')?.classList.add('d-none');
      console.log("data ", data);
    });
  }


  ngOnInit(): void {
    this.searchCategoryTerm = "none";
    this.fetchArticleList();
    this.fetchCategoryList();




    this.breadCrumbItems = [
      { label: 'Articles', active: true },
      { label: 'Article Grid', active: true }
    ];

    this.articleForm = this.formBuilder.group({
      id: ['', []],
      name: ['article1', [Validators.required, Validators.minLength(3)]],
      price: [10, [Validators.required, Validators.min(0)]],
      quantity: [10, [Validators.required, Validators.min(0)]],
      description: ['article1 description', [Validators.required, Validators.minLength(3)]],
      category: ['1', [Validators.required]],
      image: [null, [Validators.required]],
    });

  }


  get formValue() {
    return this.articleForm.controls;
  }


  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl + "");

    // Convert Blob to File
    const file = new File([event.blob!], "croppedImage.png", { type: event.blob!.type });

    this.articleForm.patchValue({
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



  addArticle() {
    this.formUtils.action = 'add';
    this.addModal?.show();
    this.articleForm.reset();
  }



  editArticle(article: any) {
    this.formUtils.articleData = article;
    console.log("edit article ", article);
    this.formUtils.action = 'edit';

    this.addModal?.show();
    this.editData = article;
    this.articleForm.patchValue({ ...article });
  }


  /* ************** CRUD ***************** */


  /* ************** HELPER ***************** */
  validateFormWithoutImage(): boolean {
    // Check all required fields except image
    return !this.articleForm.get('name')?.invalid &&
      !this.articleForm.get('description')?.invalid &&
      !this.articleForm.get('price')?.invalid &&
      !this.articleForm.get('quantity')?.invalid &&
      !this.articleForm.get('category')?.invalid;
  }

  /* ************** HELPER ***************** */

  /* ************** ADD ***************** */
  saveArticle() {
    var formData = new FormData();
    const isImageUnchanged = this.formUtils.action === 'edit' && !this.articleForm.get('image')?.dirty;

    if (this.formUtils.action === 'edit') {

      if (this.articleForm.valid) {
        console.log("edit with image")
        formData = new FormData();
        const imageFile = this.articleForm.get('image')?.value;
        formData.append('id', this.articleForm.get('id')?.value);
        formData.append('file', imageFile);
        formData.append('name', this.articleForm.get('name')?.value);
        formData.append('description', this.articleForm.get('description')?.value);
        formData.append('price', this.articleForm.get('price')?.value);
        formData.append('quantity', this.articleForm.get('quantity')?.value);
        formData.append('category', this.articleForm.get('category')?.value);

        console.log("edit ", this.editData);
        this.store.dispatch(updatearticleData({ id: this.editData.id, updatedData: formData }));
      }
      else if ((this.validateFormWithoutImage() && isImageUnchanged)) {
        formData = new FormData();
        const imageFile: any = null;
        formData.append('id', this.articleForm.get('id')?.value);
        formData.append('file', imageFile);
        formData.append('name', this.articleForm.get('name')?.value);
        formData.append('description', this.articleForm.get('description')?.value);
        formData.append('price', this.articleForm.get('price')?.value);
        formData.append('quantity', this.articleForm.get('quantity')?.value);
        formData.append('category', this.articleForm.get('category')?.value);

        console.log("edit without image");
        const id = this.editData.id;
        this.store.dispatch(updatearticleData({ id, updatedData: formData }));
      }

    } else {
      if (this.formUtils.action === 'add') {
        if (this.articleForm.valid) {
          formData = new FormData();
          const imageFile = this.articleForm.get('image')?.value;
          formData.append('id', this.articleForm.get('id')?.value);
          formData.append('file', imageFile);
          formData.append('name', this.articleForm.get('name')?.value);
          formData.append('description', this.articleForm.get('description')?.value);
          formData.append('price', this.articleForm.get('price')?.value);
          formData.append('quantity', this.articleForm.get('quantity')?.value);
          formData.append('category', this.articleForm.get('category')?.value);
          console.log("add");
          this.store.dispatch(addarticleData({ newData: formData }));
        }
      }
    }

    this.addModal?.hide();
    this.articleForm.reset();
  }
  /* ************** ADD ***************** */

  /* ************** DELETE ***************** */
  deleteArticle(id: any) {
    this.deleteID = id;
    this.deleteModal?.show();
  }

  confirmDelete() {
    console.log("this.deleteID ", this.deleteID);
    this.store.dispatch(deletearticleData({ id: this.deleteID.toString() }));
    this.deleteModal?.hide();
  }
  /* ************** DELETE ***************** */

  /* ************** EDIT ***************** */
  editModal(article: any) {
    this.formUtils.articleData = article;
    console.log("article ", article);
    this.formUtils.action = 'edit';

    this.addModal?.show();
    this.editData = article;
    this.articleForm.patchValue({ ...article });
  }
  /* ************** EDIT ***************** */


  /* ************** CRUD ***************** */




  // saveProperty() {
  //   if (this.agentForm.valid) {
  //     const formData = new FormData();
  //     const imageFile = this.agentForm.get('image')?.value;
  //     formData.append('id', this.agentForm.get('id')?.value);
  //     formData.append('file', imageFile);
  //     formData.append('firstName', this.agentForm.get('firstName')?.value);
  //     formData.append('lastName', this.agentForm.get('lastName')?.value);
  //     formData.append('email', this.agentForm.get('email')?.value);
  //     const password = this.agentForm.get('password')?.value;
  //     if (password) {
  //       formData.append('password', password);
  //     }
  //     formData.append('phoneNumber', this.agentForm.get('phoneNumber')?.value);
  //     formData.append('address', this.agentForm.get('address')?.value);
  //     formData.append('accesses', this.agentForm.get('accesses')?.value);

  //     if (imageFile instanceof File) {

  //       if (this.formUtils.action === 'add') {
  //         this.store.dispatch(addagentData({ newData: formData }));
  //       }

  //     } else {
  //       console.error('The image field does not contain a valid File object.');
  //       return;
  //     }


  //     this.addAgent?.hide();
  //     this.agentForm.reset();
  //     this.submitted = true;
  //   }

  //   if (this.formUtils.action === 'edit') {

  //     const formData = new FormData();
  //     const imageFile = this.agentForm.get('image')?.value;
  //     formData.append('id', this.agentForm.get('id')?.value);
  //     formData.append('file', imageFile);
  //     formData.append('firstName', this.agentForm.get('firstName')?.value);
  //     formData.append('lastName', this.agentForm.get('lastName')?.value);
  //     formData.append('email', this.agentForm.get('email')?.value);
  //     if (this.agentForm.get('password')?.value?.length > 0) {
  //       const password = this.agentForm.get('password')?.value;
  //       if (password) {
  //         formData.append('password', password);
  //       }
  //     }
  //     formData.append('phoneNumber', this.agentForm.get('phoneNumber')?.value);
  //     formData.append('address', this.agentForm.get('address')?.value);
  //     formData.append('accesses', this.agentForm.get('accesses')?.value);


  //     if (this.formUtils.action === 'edit') {
  //       console.log("formData ", this.agentForm.value);
  //       this.agentService.updateData(formData).subscribe((data) => {
  //         this.fetchAgentsList();
  //       });
  //     }

  //     this.addAgent?.hide();
  //     this.agentForm.reset();
  //     this.submitted = true;
  //   }

  // }


  pageChanged(event
    :
    PageChangedEvent
  ):
    void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.articles = this.articleList.slice(startItem, endItem);
  }

  selectstatus() {
    const courtType = (document.getElementById("status-input") as HTMLInputElement).value;
    if (courtType) {
      this.articles = this.articleList.filter((data: any) => {
        return data.type == courtType;
      });
    } else {
      this.articles = this.articleList.slice(0, 10);
    }
  }



  performSearch(): void {

    console.log("this.searchTerm ", this.searchTerm);
    this.searchResults = this.articleList.filter((item: any) => {
      return item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        || item.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    });
    this.articles = this.searchResults.slice(0, 10);
    this.updateNoResultDisplay();
  }

  searchByCategory(): void {
    if (this.searchCategoryTerm == "none") {
      this.articles = this.articleList.slice(0, 10);
      return;
    }
    console.log("this.searchTerm ", this.searchCategoryTerm);
    this.searchResults = this.articleList.filter(
      (item: any) => item.category == this.searchCategoryTerm);

    this.articles = this.searchResults.slice(0, 10);
    this.updateNoResultDisplay();
  }

  updateNoResultDisplay() {
    console.log("here no display update")
    const noResultElement = document.getElementById('noresult') as HTMLElement;
    const paginationElement = document.getElementById('pagination-element') as HTMLElement;

    if (this.articles.length == 0) {
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



}
