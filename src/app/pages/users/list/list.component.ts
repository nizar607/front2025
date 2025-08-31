import { DecimalPipe } from '@angular/common';
import { Component, ViewChild, QueryList, ViewChildren } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Store } from '@ngrx/store';
import { UserService } from 'src/app/core/services/user/user.service';
import { Router } from '@angular/router';
import { fetcharticleData } from 'src/app/store/Article/article.action';
import { selectarticleData } from 'src/app/store/Article/article-selector';
import { fetchUserData, updateUserData, fetchUserStats } from 'src/app/store/User/users.action';
import { selectlistData as selectUserData, selectUserStats } from 'src/app/store/User/users.selector';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [DecimalPipe]
})

// List Component
export class ListComponent {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  userslist: any
  users: any;
  deleteID: any;
  masterSelected!: boolean;
  term: any

  selectedCase: any;
  usersData: any;
  totalUsers: any;
  selectedUser: any;
  userStats: any;

  articles: any[] = [];



  @ViewChild('deleteRecordModal', { static: false }) deleteRecordModal?: ModalDirective;
  @ViewChild('viewUserModal', { static: false }) viewUserModal?: ModalDirective;

  constructor(public store: Store, private userservice: UserService, private router: Router) {
  }

  ngOnInit(): void {
    /**
     * BreadCrumb
     */


    // Fetch Data
    setTimeout(() => {



      this.store.dispatch(fetchUserData());
      this.store.select(selectUserData).subscribe((data) => {
        // Create deep copies to make objects mutable
        this.userslist = data.map((user: any) => ({ ...user }));
        this.users = this.userslist.slice(0, 10);

        console.log('this.users', this.users)

        this.totalUsers = this.userslist.length;
      })

      // Fetch user stats
      this.store.dispatch(fetchUserStats());
      this.store.select(selectUserStats).subscribe((stats) => {
        this.userStats = {...stats};
        console.log('User stats:', this.userStats);
      })







      document.getElementById('elmLoader')?.classList.add('d-none')
    }, 1000)

  }

  // Sort Data
  direction: any = 'asc';
  onSort(column: any) {
    if (this.direction == 'asc') {
      this.direction = 'desc';
    } else {
      this.direction = 'asc';
    }
    const sortedArray = [...this.users]; // Create a new array
    sortedArray.sort((a, b) => {
      const res = this.compare(a[column], b[column]);
      return this.direction === 'asc' ? res : -res;
    });
    this.users = sortedArray;
  }
  compare(v1: string | number, v2: string | number) {
    return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
  }

  // filterdata
  filterdata() {
    if (this.term) {
      this.users = this.userslist.filter((el: any) => el.customer.toLowerCase().includes(this.term.toLowerCase()))
    } else {
      this.users = this.userslist
    }
    // noResultElement
    this.updateNoResultDisplay();
  }

  // no result 
  updateNoResultDisplay() {
    const noResultElement = document.querySelector('.noresult') as HTMLElement;

    if (this.term && this.users.length === 0) {
      noResultElement.style.display = 'block';
    } else {
      noResultElement.style.display = 'none';
    }
  }


  checkedValGet: any[] = [];
  // The master checkbox will check/ uncheck all items
  checkUncheckAll(ev: any) {
    this.users = this.users.map((x: { states: any }) => ({ ...x, states: ev.target.checked }));

    var checkedVal: any[] = [];
    var result;
    for (var i = 0; i < this.users.length; i++) {
      if (this.users[i].states == true) {
        result = this.users[i].id;
        checkedVal.push(result);
      }
    }

    this.checkedValGet = checkedVal;
    checkedVal.length > 0 ? document.getElementById("remove-actions")?.classList.remove('d-none') : document.getElementById("remove-actions")?.classList.add('d-none');
  }
  // Select Checkbox value Get
  onCheckboxChange(e: any) {
    var checkedVal: any[] = [];
    var result
    for (var i = 0; i < this.users.length; i++) {
      if (this.users[i].states == true) {
        result = this.users[i].id;
        checkedVal.push(result);
      }
    }
    this.checkedValGet = checkedVal
    checkedVal.length > 0 ? document.getElementById("remove-actions")?.classList.remove('d-none') : document.getElementById("remove-actions")?.classList.add('d-none');
  }


  deleteData(id: any) {

    this.userservice.deleteData(id).subscribe((data) => {
      this.users = this.users.filter((x: { id: any; }) => x.id !== id)
    }
    )
    this.deleteRecordModal?.hide();
    this.masterSelected = false
  }

  // Page Changed
  pageChanged(event: any): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.users = this.userslist
      .slice(startItem, endItem);
  }




  onChange(event: any) {
    this.selectedCase = event;
    console.log('event', this.selectedCase.id);
  }





  viewUser(user: any) {
    this.selectedUser = user;
    this.viewUserModal?.show();
  }

  editUser(user: any) {
    this.viewUserModal?.hide();
    // Navigate to edit user page or open edit modal
    console.log('Edit user:', user);
  }


  changeStatus(user: any) {
    if(user.enabled){
      this.userStats.permitted --;
      this.userStats.banned ++;
    }else{
      this.userStats.banned --;
      this.userStats.permitted ++;
    }
    user.enabled = !user.enabled;
    this.store.dispatch(updateUserData({updatedData: user}));
  }


}