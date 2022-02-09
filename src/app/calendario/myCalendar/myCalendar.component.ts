import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';

@Component({
  selector: 'app-myCalendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './myCalendar.component.html',
  styleUrls: ['./myCalendar.component.scss']
})
export class MyCalendarComponent  {

  view: CalendarView = CalendarView.Month;

  viewDate: Date = new Date();

  events: CalendarEvent[] = [];

  clickedDate: Date;

  clickedColumn: number;

}
