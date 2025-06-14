import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// { path: 'articles/create', component: CreateArticleComponent, canActivate: [PermissionGuard], data: { permission: 'create-article' } }

const routes: Routes = [
  {
    path: '', loadChildren: () => import('./dashboards/dashboards.module').then(m => m.DashboardsModule)
  },
  {
    path: 'article', loadChildren: () => import('./article/article.module').then(m => m.ArticleModule)
  },
  {
    path: 'category', loadChildren: () => import('./category/category.module').then(m => m.CategoryModule)
  },
  {
    path: 'agent', loadChildren: () => import('./agent/agent.module').then(m => m.AgentModule)
  },
  {
    path: 'apps', loadChildren: () => import('./apps/apps.module').then(m => m.AppsModule)
  },
  {
    path: 'invoices', loadChildren: () => import('./invoices/invoices.module').then(m => m.InvoicesModule)
  },
  {
    path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PagesRoutingModule { }
