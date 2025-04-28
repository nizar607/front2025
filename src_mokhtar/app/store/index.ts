import { ActionReducerMap } from "@ngrx/store";




import { InvoiceReducer, InvoiceState } from "./Invoices/invoices.reducer";
import { AuthenticationState, authenticationReducer } from "./Authentication/authentication.reducer";
import { LayoutState, layoutReducer } from "./layouts/layout-reducers";
import { CustomerReducer, CustomerState } from "./Customer/customer.reducer";
import { AgentReducer, AgentState } from "./Agent/agent.reducer";
import { ArticleReducer, ArticleState } from './Article/article.reducer';
import { CategoryReducer, CategoryState } from './Category/category.reducer';

export interface RootReducerState {
  CategoryList: CategoryState;
  layout: LayoutState,
  auth: AuthenticationState;
  Agentlist: AgentState;
  Invoice: InvoiceState;
  CustomerList: CustomerState;

  ArticleList: ArticleState;
}

export const rootReducer: ActionReducerMap<RootReducerState> = {
  layout: layoutReducer,
  auth: authenticationReducer,
  Agentlist: AgentReducer,
  Invoice: InvoiceReducer,
  CustomerList: CustomerReducer,
  ArticleList: ArticleReducer,
  CategoryList: CategoryReducer,
}


