import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  EventEmitter,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
  DAYS_OF_WEEK,
} from 'angular-calendar';
import flatpickr from "flatpickr"
import { PlannerService } from 'src/app/services/planner.service';


flatpickr.l10ns.default.firstDayOfWeek = 1;

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  @ViewChild('noteView', { static: true }) noteView: TemplateRef<any>;

  @ViewChild('eventView', { static: true }) eventView: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.clickedEdit = true;
        this.oldEvent = { ...event };
        this.tempEvent = event;
      },
    },
    {
      label: '<i class="fas fa-fw fa-clipboard"></i>',
      a11yLabel: 'Note',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        // this.events = this.events.filter((iEvent) => iEvent !== event);
        // if (event == this.tempEvent) this.tempEvent = null
        this.noteEvent('Note', event);

      },
    },
  ];

  refresh: Subject<any> = new Subject();

  tempEvent: CalendarEvent;

  oldEvent: CalendarEvent;

  clickedEdit: boolean = false;

  events: CalendarEvent[] = [
    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'A 3 day event',
      color: colors.red,
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
    {
      start: startOfDay(new Date()),
      title: 'An event with no end date',
      color: colors.yellow,
      actions: this.actions,
    },
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'A long event that spans 2 months',
      color: colors.blue,
      allDay: true,
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: addHours(new Date(), 2),
      title: 'A draggable and resizable event',
      color: colors.yellow,
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
  ];

  activeDayIsOpen: boolean = true;

  constructor(private modal: NgbModal, private plannerService: PlannerService) { }


  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    this.tempEvent = null;
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.tempEvent = null;
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    // this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  noteEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.noteView, { size: 'lg' });
  }

  showEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.eventView, { size: 'lg' });
  }

  addEvent(): void {
    if (this.clickedEdit == false) {
      this.events = [...this.events, this.tempEvent];
    }
    var json = JSON.stringify({ start: this.tempEvent.start, end: this.tempEvent.end, title: this.tempEvent.title, color: this.tempEvent.color, userid: 3, noteid: 1 })
    this.plannerService.sendPostRequest(json.toString());

    this.tempEvent = null;
    this.clickedEdit = false;
  }

  createNewEvent(): void {
    this.clickedEdit = false;
    this.tempEvent = {
      title: 'New event',
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      color: colors.red,
      actions: this.actions,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      }
    }
  }

  cancelEdit(): void {
    this.tempEvent = Object.assign(this.tempEvent, this.oldEvent);
    this.tempEvent = null;
    this.refresh.next();
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
    this.tempEvent = null;
    this.clickedEdit = false;
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}