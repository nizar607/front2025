import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { category } from 'src/app/core/data/learning';
import { selectarticleData } from 'src/app/store/Article/article-selector';
import { fetcharticleData, searcharticleData } from 'src/app/store/Article/article.action';
import { selectcategoryData } from 'src/app/store/Category/category-selector';
import { fetchcategoryData } from 'src/app/store/Category/category.action';


export interface checkBox {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: checkBox[];
}


@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.css'
})

export class ArticlesComponent {



  checkBox: checkBox = {
    name: 'Indeterminate',
    completed: false,
    color: 'primary',
    subtasks: [],
  };

  imageUrl = 'localhost:8080/files/'
  minSlider = 0;
  maxSlider = 5000;
  allComplete: boolean = false;
  articleList: any[] = [];
  articles: any[] = [];
  searchInput: string = '';

  categories: any[] = [];
  itemsPerPage = 10;
  currentPage = 1;


  constructor(private store: Store, private router: Router) {

  }

  viewArticleDetials(id: number) {
    this.router.navigate(['/client/product', id]);
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
      this.categories = data;
      this.checkBox.subtasks = this.categories.map(category => {
        return {
          id: category.id,
          name: category.name,
          completed: true,
          color: 'warn',
        };
      });
    });
  }



  ngOnInit() {
    this.fetchArticleList();
    this.fetchCategoryList();
  }

  ngAfterViewInit() {

    this.setAll(true);

  }

  updateAllComplete() {
    this.allComplete = this.checkBox.subtasks != null && this.checkBox.subtasks.every(t => t.completed);
  }

  someComplete(): boolean {
    if (this.checkBox.subtasks == null) {
      return false;
    }
    return this.checkBox.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.checkBox.subtasks == null) {
      return;
    }
    this.checkBox.subtasks.forEach(t => (t.completed = completed));
  }

  searchArticles() {
    const searchInput = this.searchInput.trim().toLocaleLowerCase();
    const minPrice = this.minSlider;
    const maxPrice = this.maxSlider;
    const _categories: any[] = this.checkBox!.subtasks!.filter(category => category.completed);
    const categories: number[] = _categories.map(category => category.id);


    this.store.dispatch(searcharticleData({ searchInput, minPrice, maxPrice, categories }));
    this.store.select(selectarticleData).subscribe((data) => {
      this.articles = data;
      console.log("search data ", data);
    })

  }



}
