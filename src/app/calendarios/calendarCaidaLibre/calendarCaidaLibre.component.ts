import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { addDays, addHours, startOfDay } from 'date-fns';
import { AuthService } from 'src/service/service.service';
import { IntegrantesPracticaComponent } from '../integrantesPractica/integrantesPractica.component';
import { colors } from '../utils/colors';



@Component({
  selector: 'app-calendarCaidaLibre',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendarCaidaLibre.component.html',
  styleUrls: ['./calendarCaidaLibre.component.scss']
})
export class CalendarCaidaLibreComponent  {

  constructor(private authSvc: AuthService, private router: Router, public dialog: MatDialog) {
  }
  
  view: CalendarView = CalendarView.Month;

  viewDate: Date = new Date();

  events: CalendarEvent[] = [
    {
      start: startOfDay(new Date()),
      title: 'Practica Caida Libre 1',
      color: colors.yellow,
    },
    {
      //start: startOfDay(new Date('February 11, 2022, 13:30')),
      //start:  addHours(startOfDay(new Date(2022, 1, 11, 10, 30, 50)),2),
      //start:  addHours(startOfDay(new Date(2022,1,11,10,30,0,0)),2),
      start: addHours(startOfDay(new Date(2022,1,11,11,0,0,0)),3),
      //start:  startOfDay(new Date("2022-02-11T05:00:00.000Z")),
      title: 'Practica Caida Libre Custom',
      color: colors.red,
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: new Date(),
      title: 'Practica Caida Libre 2',
      color: colors.blue,
    },
    {
      start: addDays(addHours(startOfDay(new Date()), 2), 2),
      end: addDays(new Date(), 2),
      title: 'And another',
      color: colors.red,
    },
  ];

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  eventClicked({ event }: { event: CalendarEvent }): void {
    alert("Haz Clickeado el evento! Dia "+event.start.getDate()+" Hora "+event.start.getHours());
    /*const dialogRef = this.dialog.open(IntegrantesPracticaComponent, {
      //data: { name: this.codigo }
    });*/
  }

  clickedDate: Date;

  clickedColumn: number;

}
