import {Component, ViewChild} from '@angular/core';
import {fetchSelectedPhaseData} from "../../../store/Phase/phase.action";
import {selectSelectedPhaseData} from "../../../store/Phase/phase.selector";
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {ModalDirective} from "ngx-bootstrap/modal";
import {deleteCaseData} from "../../../store/Case/case.action";

@Component({
  selector: 'app-phases',
  templateUrl: './phases.component.html',
  styleUrl: './phases.component.scss'
})

export class PhasesComponent {

  @ViewChild('addHearing', { static: false }) addHearing?: ModalDirective;
  @ViewChild('deleteRecordModal', {static: false}) deleteRecordModal?: ModalDirective;

  selectedPhasesList! : any[];


  constructor( public store: Store,private router:Router) {  }


  ngOnInit(): void {
    this.store.select(selectSelectedPhaseData).subscribe((data) => {
      this.selectedPhasesList = data;
      console.log("Phases list", this.selectedPhasesList)
    });

  }

  deleteData(id: any) {
    this.deleteRecordModal?.hide();
    /*if (id) {
      this.store.dispatch(deleteCaseData({id: this.deleteID.toString()}));
    }
     */
    this.deleteRecordModal?.hide();
  }

  navigateToCalendar(id:string){
    this.router.navigate(['/apps/calendar']);
  }
}
