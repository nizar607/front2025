import { ActionReducerMap } from "@ngrx/store";





import { AnalyticsReducer, AnalyticsState } from "./Analytics/analytics.reducer";
import { CRMReducer, CRMState } from "./CRM/crm.reducer";
import { ECoReducer, ECoState } from "./Ecommerce/ecommerce.reducer";
import { LearningReducer, LearningState } from "./Learning/learning.reducer";
import { RealReducer, RealState } from "./RealEstate/realEstate.reducer";
import { AppRealestateReducer, AppRealestateState } from "./App-realestate/apprealestate.reducer";
import { AgenciesReducer, AgenciesState } from "./Agency/agency.reducer";
import { TicketReducer, TicketState } from "./Tickets/ticket.reducer";
import { ChatReducer, ChatState } from "./chat/chat.reducer";
import { ProductReducer, ProductState } from "./Product/product.reducer";
import { InvoiceReducer, InvoiceState } from "./Invoices/invoices.reducer";
import { AuthenticationState, authenticationReducer } from "./Authentication/authentication.reducer";
import { LayoutState, layoutReducer } from "./layouts/layout-reducers";
import { SelleReducer, SellerState } from "./Seller/seller.reducer";
import { OrderReducer, OrderState } from "./Orders/order.reducer";
import { InstructorReducer, InstructorState } from "./Learning-instructor/instructor.reducer";
import { CustomerReducer, CustomerState } from "./Customer/customer.reducer";
import { StudentsReducer, studentState } from "./students/student.reducer";
import { CourcesReducer, CourcesState } from "./Learning-cources/cources.reducer";
import { PeopleGroupReducer, PeopleGroupState } from "./PeopleGroup/peapleGroup.reducer";
import { ContactReducer, ContactState } from "./Contact/contact.reducer";
import { CaseReducer, CaseState } from "./Case/case.reducer";
import { PhaseReducer, PhaseState } from "./Phase/phase.reducer";
import { TaskReducer, TaskState } from "./Task/task.reducer";
import { MeetingReducer, MeetingState } from "./Meeting/meeting.reducer";
import { CourtReducer, CourtState } from "./Court/court.reducer";
import { MapReducer, MapState } from "./Map/map.reducer";
import { DocumentReducer, DocumentState } from "./Document/document.reducer";
import { HearingReducer, HearingState } from "./Hearing/hearing.reducer";
import { AgentReducer, AgentState } from "./Agent/agent.reducer";
import { ArticleReducer, ArticleState } from './Article/article.reducer';
import { CategoryReducer, CategoryState } from './Category/category.reducer';

export interface RootReducerState {
  CategoryList: CategoryState;
  layout: LayoutState,
  auth: AuthenticationState;
  statlist: AnalyticsState;
  CRMlist: CRMState;
  Ecommercelist: ECoState;
  Learninglist: LearningState;
  Realist: RealState;
  Apprealestate: AppRealestateState;
  Agentlist: AgentState;
  Agenciesdata: AgenciesState;
  ticketlist: TicketState;
  Chatmessage: ChatState;
  product: ProductState;
  Invoice: InvoiceState;
  Sellerlist: SellerState;
  Orderlist: OrderState;
  LearningList: InstructorState;
  CustomerList: CustomerState;
  PeopleGroupList: PeopleGroupState;
  SubscriptionList: studentState;
  CourcesList: CourcesState;
  Instructorlist: InstructorState;
  ContactList: ContactState;
  CaseList: CaseState;
  PhaseList: PhaseState;
  TaskList: TaskState;
  MeetingList: MeetingState;
  CourtList: CourtState;
  MapList: MapState;
  DocumentList: DocumentState;
  HearingList: HearingState;
  ArticleList: ArticleState;
}

export const rootReducer: ActionReducerMap<RootReducerState> = {
  layout: layoutReducer,
  statlist: AnalyticsReducer,
  CRMlist: CRMReducer,
  auth: authenticationReducer,
  Ecommercelist: ECoReducer,
  Learninglist: LearningReducer,
  Realist: RealReducer,
  Apprealestate: AppRealestateReducer,
  Agentlist: AgentReducer,
  Agenciesdata: AgenciesReducer,
  ticketlist: TicketReducer,
  Chatmessage: ChatReducer,
  product: ProductReducer,
  Invoice: InvoiceReducer,
  Sellerlist: SelleReducer,
  Orderlist: OrderReducer,
  LearningList: InstructorReducer,
  CustomerList: CustomerReducer,
  PeopleGroupList: PeopleGroupReducer,
  SubscriptionList: StudentsReducer,
  CourcesList: CourcesReducer,
  Instructorlist: InstructorReducer,
  ContactList: ContactReducer,
  CaseList: CaseReducer,
  PhaseList: PhaseReducer,
  TaskList: TaskReducer,
  MeetingList: MeetingReducer,
  CourtList: CourtReducer,
  MapList: MapReducer,
  DocumentList: DocumentReducer,
  HearingList: HearingReducer,
  ArticleList: ArticleReducer,
  CategoryList: CategoryReducer,
}


