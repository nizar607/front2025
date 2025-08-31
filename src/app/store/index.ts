import { ActionReducerMap } from "@ngrx/store";




import { InvoiceReducer, InvoiceState } from "./Invoice/invoice.reducer";
import { AuthenticationState, authenticationReducer } from "./Authentication/authentication.reducer";
import { LayoutState, layoutReducer } from "./layouts/layout-reducers";
import { CustomerReducer, CustomerState } from "./Customer/customer.reducer";
import { AgentReducer, AgentState } from "./Agent/agent.reducer";
import { ArticleReducer, ArticleState } from './Article/article.reducer';
import { CategoryReducer, CategoryState } from './Category/category.reducer';
import { ReviewReducer, ReviewState } from "./Review/review.reducer";
import { FavoriteReducer, FavoriteState } from "./Favorite/favorite.reducer";
import { CartReducer, CartState } from "./Cart/cart.reducer";
import { CompanyReducer, CompanyState } from "./Company/company.reducer";
import { AboutUsReducer, AboutUsState } from "./AboutUs/aboutUs.reducer";
import { HomepageReducer, HomepageState } from "./Homepage/homepage.reducer";
import { Homepage1Reducer, Homepage1State } from "./Homepage1/homepage1.reducer";
import { Homepage2Reducer, Homepage2State } from "./Homepage2/homepage2.reducer";
import { Homepage3Reducer, Homepage3State } from "./Homepage3/homepage3.reducer";
import { ProfileReducer, ProfileState } from "./Profile/profile.reducer";
import { UserReducer, UserState } from "./User/users.reducer";

export interface RootReducerState {
  CategoryList: CategoryState;
  layout: LayoutState,
  auth: AuthenticationState;
  Agentlist: AgentState;
  Invoice: InvoiceState;
  CustomerList: CustomerState;
  ArticleList: ArticleState;
  ReviewList: ReviewState;
  FavoriteList: FavoriteState;
  cart: CartState;
  CompanyList: CompanyState;
  AboutList: AboutUsState;
  HomepageList: HomepageState;
  Homepage1List: Homepage1State;
  Homepage2List: Homepage2State;
  Homepage3List: Homepage3State;
  Profilelist: ProfileState;
  Userlist: UserState;
}

export const rootReducer: ActionReducerMap<RootReducerState> = {
  layout: layoutReducer,
  auth: authenticationReducer,
  Agentlist: AgentReducer,
  Invoice: InvoiceReducer,
  CustomerList: CustomerReducer,
  ArticleList: ArticleReducer,
  CategoryList: CategoryReducer,
  ReviewList: ReviewReducer,
  FavoriteList: FavoriteReducer,
  cart: CartReducer,
  CompanyList: CompanyReducer,
  AboutList: AboutUsReducer,
  HomepageList: HomepageReducer,
  Homepage1List: Homepage1Reducer,
  Homepage2List: Homepage2Reducer,
  Homepage3List: Homepage3Reducer,
  Profilelist: ProfileReducer,
  Userlist: UserReducer,
}


