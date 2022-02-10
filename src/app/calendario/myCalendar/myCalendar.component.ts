import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { addDays, addHours, startOfDay } from 'date-fns';
import { colors } from '../utils/colors';

@Component({
  selector: 'app-myCalendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './myCalendar.component.html',
  styleUrls: ['./myCalendar.component.scss']
})
export class MyCalendarComponent  {

  view: CalendarView = CalendarView.Month;

  viewDate: Date = new Date();

  events: CalendarEvent[] = [
    {
      start: startOfDay(new Date()),
      title: 'An event',
      color: colors.yellow,
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: new Date(),
      title: 'Another event',
      color: colors.blue,
    },
    {
      start: addDays(addHours(startOfDay(new Date()), 2), 2),
      end: addDays(new Date(), 2),
      title: 'And another',
      color: colors.red,
    },
  ];

  clickedDate: Date;

  clickedColumn: number;

}
