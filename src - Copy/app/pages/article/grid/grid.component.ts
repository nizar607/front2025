import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Store } from '@ngrx/store';
import {
  addarticleData,
  deletearticleData,
  fetcharticleData,
} from 'src/app/store/Article/article.action';
import { selectarticleData } from 'src/app/store/Article/article-selector';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { LeafletComponent } from "../../maps/leaflet/leaflet.component";
import { selectMapData, selectSelectedMapData } from "../../../store/Map/map-selector";
import { document } from "ngx-bootstrap/utils";
import { HttpClient } from '@angular/common/http';
import { ArticleService } from 'src/app/core/services/article/article.service';
import { fetchcategoryData } from 'src/app/store/Learning/learning.action';
import { selectcategoryData } from 'src/app/store/Learning/learning-selector';
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
      this.articles = this.articleList.slice(0, 10);
      console.log("articleList ", this.articleList);
    });
  }

  ngOnInit(): void {

    this.fetchArticleList();

    this.categoryService.fetchData().subscribe((data) => {
      this.categoryList = data.map((item: any) => { return { name: item.name, value: item.id } });
      console.log("categoryList ", data);
    });

    // this.store.dispatch(fetchcategoryData());

    // this.store.select(selectcategoryData).subscribe((data) => {
    //   this.categoryList = data;
    //   console.log("categoryList  fetched", data);
    // });

    // this.store.select(selectSelectedMapData).subscribe((data) => {
    //   this.mapData = data;
    // });

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
      category: ['', [Validators.required]],
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
    console.log("article ", article);
    this.formUtils.action = 'edit';

    this.addModal?.show();
    this.editData = article;
    this.articleForm.patchValue({ ...article });
  }

  saveArticle() {
    var formData = new FormData();

    if (this.articleForm.valid) {
      console.log("valid");
      formData = new FormData();
      const imageFile = this.articleForm.get('image')?.value;
      formData.append('id', this.articleForm.get('id')?.value);
      formData.append('file', imageFile);
      formData.append('name', this.articleForm.get('name')?.value);
      formData.append('description', this.articleForm.get('description')?.value);
      formData.append('price', this.articleForm.get('price')?.value);
      formData.append('quantity', this.articleForm.get('quantity')?.value);
      formData.append('category', this.articleForm.get('category')?.value);

      const article = this.articleForm.value;
      if (this.formUtils.action === 'edit') {
        console.log("article edit ", article);
        this.articleService.updateData(article.id, article).subscribe((data) => {
          console.log("data ", data);
          this.fetchArticleList();
        });
      } else if (this.formUtils.action === 'add') {
        console.log("add");
        console.log("article add ", formData.forEach((value, key) =>
          console.log(key, value)));
        this.store.dispatch(addarticleData({ newData: formData }));
      }
    }

    this.addModal?.hide();
    this.articleForm.reset();
  }

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


}
