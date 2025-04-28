import { Component, ViewChild } from '@angular/core';
import { UntypedFormBuilder, Validators, UntypedFormGroup, FormControl, FormGroup } from '@angular/forms';
import { selectData } from "../../../store/Case/case.selector";
import { fetchCaseData } from "../../../store/Case/case.action";
import { createEventId } from './data';
// Sweet Alert
import Swal from 'sweetalert2';
// Calendar option
import { CalendarOptions, EventApi, EventClickArg, EventInput } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { addmeetingData, deletemeetingData } from "../../../store/Meeting/meeting.action";
import { selectData as selectMeetingData, selectNewMeetingData } from "../../../store/Meeting/meeting.selector";
import { HttpClient } from "@angular/common/http";
import { fetchcourtData } from 'src/app/store/Court/court.action';
import { selectcourtData } from 'src/app/store/Court/court-selector';
import { addHearingData } from 'src/app/store/Hearing/hearing.action';
import { selectNewHearingData } from 'src/app/store/Hearing/hearing.selector';
import { co } from '@fullcalendar/core/internal-common';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})

// calendar Component
export class CalendarComponent {
  calendarOptions: CalendarOptions | undefined = undefined;

  calendarEvents!: EventInput[];
  editEvent: any;
  newEventDate: any;
  submitted = false;
  formData!: FormGroup;
  isEditMode: boolean = false;
  phaseId!: string | null;
  selectedPhaseData: any;
  myControl = new FormControl('');
  caseNumberControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  cases: any[] = [];
  courts: any[] = [];
  events: EventInput[] = [];
  currentEvents: EventApi[] = [];
  @ViewChild('eventModal', { static: false }) eventModal?: ModalDirective;
  @ViewChild('editEventModal', { static: false }) editEventModal?: ModalDirective;
  @ViewChild('detaisEventModal', { static: false }) detaisEventModal?: ModalDirective;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    public store: Store
  ) {
  }


  ngOnInit(): void {

    // this.store.select(selectMeetingData).subscribe(
    //   (data) => {
    //     this.events = data.map((event: any) => {
    //       return { ...event, start: new Date(event.start), end: new Date(event.end), className: "bg-warning-subtle" };
    //     });
    //   }
    // );

    const data = this.route.snapshot.data['data'];


    this.events = data.map((event: any) => {
      return { ...event, start: new Date(event.start),end:new Date(new Date(event.end).setDate(new Date(event.end).getDate() - 1)), className: event.type==='meeting'?"bg-warning-subtle":"bg-primary-subtle" };
    });
    console.log("events ", this.events);

    this.store.dispatch(fetchcourtData());
    this.store.select(selectcourtData).subscribe((data) => {
      this.courts = data;
    });

    /***
     * Calender Set
     */
    this.calendarOptions = {
      plugins: [dayGridPlugin, listPlugin, interactionPlugin, timeGridPlugin],
      headerToolbar: {
        right: 'dayGridMonth,dayGridWeek,dayGridDay,listWeek',
        center: 'title',
        left: 'prev,next today'
      },
      initialView: 'dayGridMonth',
      initialEvents: this.events,
      themeSystem: "bootstrap",
      timeZone: 'local',
      droppable: true,
      editable: true,
      selectable: true,
      navLinks: true,
      select: this.openModal.bind(this),
      eventClick: this.handleEventClick.bind(this),
      eventsSet: this.handleEvents.bind(this),
      eventResizableFromStart: true,
    };

    //fetch cases
    this.store.dispatch(fetchCaseData());
    this.store.select(selectData).subscribe((data) => {
      this.cases = data;
    });

    // Validation
    this.formData = this.formBuilder.group({
      title: ['example event', [Validators.required]],
      category: ['bg-success-subtle', [Validators.required]],
      type: ['meeting'],
      location: ['San francisco', [Validators.required]],
      description: ['even description example', [Validators.required]],
      startTime: ['12:00'],
      endTime: ['19:00'],
      start: [''],
      end: [''],
      purpose: [''],
      court: [''],
      selectedCase: [''],
      selectedPhase: [''],
      selectedCourt: ['']
    });

  }

  get form() {
    return this.formData.controls;
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _filterCases(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.cases.filter(option => option.number.toString().toLowerCase().includes(filterValue));
  }


  /**
   * Event add modal
   */
  openModal(events?: any) {
    this.isEditMode = false;
    const startDay = events.start;
    const endDay = events.end;
    this.formData.patchValue({ start: startDay });
    this.formData.patchValue({ end: endDay });


    setTimeout(() => {
      var modaltitle = document.querySelector('.modal-title') as HTMLAreaElement;
      modaltitle.innerHTML = "Add Event";

      var modalbtn = document.querySelector('#btn-save-event') as HTMLAreaElement;
      modalbtn.innerHTML = "Add Event";

      document.getElementById('btn-delete-event')?.classList.add('d-none');

      (document.querySelector(".event-form") as HTMLElement).style.display = "block";
    }, 100);

    this.eventModal?.show();
    this.submitted = false;
    this.newEventDate = events;
  }

  /**
   * Event click modal show
   */
  handleEventClick(clickInfo: EventClickArg) {

    this.editEvent = clickInfo.event;
    this.detaisEventModal?.show();

    console.log("clickInfo ", clickInfo.event);
    this.formData = this.formBuilder.group({
      title: clickInfo.event.title,
      category: clickInfo.event.classNames[0],
      location: clickInfo.event.extendedProps['location'],
      description: clickInfo.event.extendedProps['description'],
      start: (clickInfo.event.start ? clickInfo.event.start : ''),
      end: (clickInfo.event.end ? clickInfo.event.end : '')
    });

  }

  // showeditEvent() {
  //   if (document.querySelector('#edit-event-btn')?.innerHTML == 'cancel') {
  //     this.eventModal?.hide();
  //   } else {
  //     (document.querySelector(".event-details") as HTMLElement).style.display = "none";
  //     (document.querySelector(".event-form") as HTMLElement).style.display = "block";
  //     (document.getElementById('btn-save-event') as HTMLElement).removeAttribute("hidden");
  //     var modalbtn = document.querySelector('#btn-save-event') as HTMLAreaElement;
  //     modalbtn.innerHTML = "Update Event"
  //     var editbtn = document.querySelector('#edit-event-btn') as HTMLAreaElement;
  //     editbtn.innerHTML = 'cancel'
  //   }
  // }

  /**
   * Events bind in calander
   * @param events events
   */
  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }

  /**
   * Close event modal
   */
  closeEventModal() {
    this.formData = this.formBuilder.group({
      title: '',
      category: '',
      location: '',
      description: '',
      date: '',
      start: '',
      end: ''
    });
    this.eventModal?.hide();
  }

  /***
   * Model Position Set
   */
  position() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Event has been saved',
      showConfirmButton: false,
      timer: 1000,
    });
  }

  /***
   * Model Edit Position Set
   */
  Editposition() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Event has been Updated',
      showConfirmButton: false,
      timer: 1000,
    });
  }

  modalTitle: string = '';
  saveButtonText: string = '';
  editCancelButtonText: string = 'Edit';

  /**
   * Save the event
   */
  saveEvent() {

    const start = this.formData.get('start')!.value;
    const end = this.formData.get('end')!.value;

    const startDate = new Date(start);
    const endDate = new Date(end);


    if (document.querySelector('#btn-save-event')?.innerHTML == 'Add Event') {
      if (this.formData.valid) {


        const startDateTime = this.formData.get('startTime')!.value.split(":");
        const endDateTime = this.formData.get('endTime')!.value.split(":");
        startDate.setHours(startDateTime[0], startDateTime[1]);
        endDate.setHours(endDateTime[0], endDateTime[1]);

        // Format the dates as strings in the "yyyy/MM/dd HH:mm" format
        const formattedStartDate = `${startDate.getFullYear()}/${(startDate.getMonth() + 1).toString().padStart(2, '0')}/${startDate.getDate().toString().padStart(2, '0')} ${startDate.getHours().toString().padStart(2, '0')}:${startDate.getMinutes().toString().padStart(2, '0')}`;
        const formattedEndDate: string = `${endDate.getFullYear()}/${(endDate.getMonth() + 1).toString().padStart(2, '0')}/${endDate.getDate().toString().padStart(2, '0')} ${endDate.getHours().toString().padStart(2, '0')}:${endDate.getMinutes().toString().padStart(2, '0')}`;

        console.log("formattedStartDate ", formattedStartDate);
        console.log("formattedEndDate ", formattedEndDate);

        const className = this.formData.get('category')!.value;
        const title = this.formData.get('title')!.value;
        const location = this.formData.get('location')!.value;
        const description = this.formData.get('description')!.value;
        const purpose = this.formData.get('purpose')!.value;
        const calendarApi = this.newEventDate.view.calendar;

        if (this.formData.value.type == 'meeting') {
          const newMeetingRequest = {
            title: title,
            location: location,
            purpose: purpose,
            description: description,
            start: formattedStartDate,
            end: formattedEndDate,
            caseId: this.formData.value.selectedCase.id,
          }
          console.log("newMeetingRequest ", newMeetingRequest);

          this.store.dispatch(addmeetingData({ newData: newMeetingRequest }));

          this.store.select(selectNewMeetingData).subscribe((savedMeeting) => {
            if (savedMeeting) {
              console.error("savedMeeting ", savedMeeting);
              // Assuming savedMeeting contains the new ID from MongoDB
              calendarApi.addEvent({
                id: savedMeeting.id,
                title: savedMeeting.title,
                start: savedMeeting.start,
                end: savedMeeting.end,
                className: "bg-primary-subtle",
                extendedProps: {
                  purpose: savedMeeting.purpose,
                },
                description: savedMeeting.description,
              });


            }
          });


        } else if (this.formData.value.type == 'hearing') {
          
          const newHearingRequest = {
            title: title,
            location: location,
            purpose: purpose,
            description: description,
            start: formattedStartDate,
            end: formattedEndDate,
            courtId: this.formData.value.selectedCourt.id,
            phaseId: this.formData.value.selectedPhase.id
          }
          console.log("newHearingRequest ", newHearingRequest);

          this.store.dispatch(addHearingData({ newData: newHearingRequest }));

          this.store.select(selectNewHearingData).subscribe((savedHearing) => {
            if (savedHearing) {
              console.error("savedMeeting ", savedHearing);
              // Assuming savedMeeting contains the new ID from MongoDB
              calendarApi.addEvent({
                id: savedHearing.id,
                title: savedHearing.title,
                start: savedHearing.start,
                end: savedHearing.end,
                className: "bg-primary-subtle",
                extendedProps: {
                  purpose: savedHearing.purpose,
                },
                description: savedHearing.description,
              });


          }
          });

        } else if (this.formData.value.type == 'task') {

        }


        this.position();
        this.resetForm();
        this.eventModal?.hide();
        this.submitted = true;
      }
    } else {
      this.editEventSave();
    }

  }


  resetForm() {
    this.formData.reset({
      title: '',
      className: '',
      location: '',
      description: '',
      date: '',
      startTime: '',
      endTime: ''
    });
    this.eventModal?.hide();
  }

  /**
   * save edit event data
   */

  editEventSave() {
    this.isEditMode = true;
    const editTitle = this.formData.get('title')!.value;
    const editCategory = this.formData.get('category')!.value;
    const editdate = this.formData.get('date')!.value;
    const editstart = this.formData.get('date')!.value;
    const editend = this.formData.get('end')!.value;
    const editlocation = this.formData.get('location')!.value;
    const editdescription = this.formData.get('description')!.value;

    const editId = this.calendarEvents.findIndex(
      (x) => x.id + '' === this.editEvent.id + ''
    );

    this.editEvent.setProp('title', editTitle);
    this.editEvent.setProp('classNames', editCategory);
    this.editEvent.setProp('date', editdate);
    this.editEvent.setProp('start', editdate);
    this.editEvent.setProp('end', editend);
    this.editEvent.setProp('location', editlocation);
    this.editEvent.setProp('description', editdescription);

    this.calendarEvents[editId] = {
      // ...this.editEvent,
      allDay: false,
      title: editTitle,
      id: this.editEvent.id,
      classNames: editCategory,
      start: editstart,
    };
    this.Editposition();
    this.resetForm();
    this.eventModal?.hide();
  }

  /**
   * Delete event
   */
  deleteEventData() {
    this.editEvent.remove();
    this.store.dispatch(deletemeetingData({ id: this.editEvent._def.publicId }));
    this.formData.reset();
    this.detaisEventModal?.hide();
  }

  get casesNames() {
    return this.cases.map(c => c.title);
  }


}
