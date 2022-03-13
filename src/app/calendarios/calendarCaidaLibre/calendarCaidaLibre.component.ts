import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CalendarDateFormatter, CalendarEvent, CalendarView } from 'angular-calendar';
import { addDays, addHours, addMinutes, startOfDay } from 'date-fns';
import { Agendamiento } from 'src/app/interfaces/agendamiento';
import { AuthService } from 'src/service/service.service';
import { colors } from '../utils/colors';



import { finalize } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { CustomDateFormatter } from '../utils/custom_date_formatter';


@Component({
  selector: 'app-calendarCaidaLibre',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendarCaidaLibre.component.html',
  styleUrls: ['./calendarCaidaLibre.component.scss'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter,
    },
  ],
})
export class CalendarCaidaLibreComponent implements OnInit {

  eventSelected: Date;
  eventFranja: number;
  eventYear: number;
  eventMonth: number;
  eventDate: number;
  eventHour: number;
  eventMinute: number;

  events: CalendarEvent<{ id: number, codG: number }>[];

  view: CalendarView = CalendarView.Month;

  viewDate: Date = new Date();

  clickedDate: Date;

  clickedColumn: number;

  excludeDays: number[] = [0, 6];

  locale: string = 'es';

  eventosQuemados: Agendamiento[];

  public eventosAux: Agendamiento[];

  private COD_LAB: number = 1;

  integrantes = new FormGroup({
    integrante_1: new FormControl('', [Validators.required, Validators.email]),
    integrante_3: new FormControl('', [Validators.required, Validators.email]),
    integrante_2: new FormControl('', [Validators.required, Validators.email]),

  });




  constructor(private authSvc: AuthService, private router: Router, public dialog: MatDialog) {

  }



  ngOnInit(): void {
    this.llenarEventos();
  }

  moveToSelectedTab(tabName: string) {
    for (let i = 0; i < document.querySelectorAll('.mat-tab-label-content').length; i++) {
      if ((<HTMLElement>document.querySelectorAll('.mat-tab-label-content')[i]).innerText == tabName) {
        (<HTMLElement>document.querySelectorAll('.mat-tab-label')[i]).click();
      }
    }
  }

  public infoEvent(): boolean {
    if (this.eventYear > 2021) { return true; }
    else { return false; }
  }

  eventClicked({ event }: { event: CalendarEvent }): void {

    if (event.meta.codG != -1) {
      alert("La practica en esta franja horaria ya ha sido agendada por alguien más!");
    }else {
      this.eventSelected = event.start;
      this.eventFranja = event.meta.id;
      this.eventYear = event.start.getFullYear();
      this.eventMonth = event.start.getMonth();
      this.eventDate = event.start.getDate();
      this.eventHour = event.start.getHours();
      this.eventMinute = event.start.getMinutes();
      alert("Haz Clickeado el evento! Dia " + event.start.getDate() + " Hora " + event.start.getHours());
    }


  }

  objAgendamiento: Agendamiento;

  enviarIntegrantes() {
    var arrayIntergrantes = [this.integrantes.value.integrante_1,
    this.integrantes.value.integrante_2,
    this.integrantes.value.integrante_3];
    var rta = -5;
    this.authSvc.enviarIntegrantes(
      this.eventFranja,
      arrayIntergrantes
    ).subscribe((respuesta) => {
      rta = respuesta
      console.log(rta)
      if (rta == 1) {
        alert("¡Practica agendada exitosamente!");
      } else if (rta == 0) {
        alert("Envio un correo no universitario")
      }
    });
  } 
  
  asingacionEventos() {
    var objCalendario: CalendarEvent<{ id: number, codG: number }>[] = [];
    var contador = 0;
    this.eventosQuemados.forEach((agendamiento: Agendamiento) => {


    var horaInicio = agendamiento.horaInicio.split(':')[0];
    var MinutosInicio = agendamiento.horaInicio.split(':')[1];

    var horaFin = agendamiento.horaFin.split(':')[0];
    var MinutosFin = agendamiento.horaFin.split(':')[1];

    var numHoraInicio = parseInt(horaInicio);
    var numMinutosInicio = parseInt(MinutosInicio);

    var numHoraFin = parseInt(horaFin);
    var numMinutosFin = parseInt(MinutosFin);


      objCalendario[contador] = {
        start: addMinutes(addHours( addDays(startOfDay(new Date(agendamiento.fecha)),1),  numHoraInicio ),numMinutosInicio ) ,
        title: 'Practica Caida Libre',
        end: addMinutes(addHours(addDays(startOfDay(new Date(agendamiento.fecha)),1),numHoraFin),numMinutosFin),
        meta: {
          id: agendamiento.idAgendamiento,
          codG: agendamiento.codGrupal,
        },
        
      }

      if(agendamiento.codGrupal==-1){
        objCalendario[contador].color=colors.red;
      }else{
        objCalendario[contador].color=colors.grey;
      }
      contador = contador + 1;
    });
    this.events = objCalendario;
    console.log(this.events);
  }

  llenarEventos() {
    console.log("Llenando Eventos");
    this.authSvc.agendamiento(this.COD_LAB).pipe(finalize(() => this.asingacionEventos())).subscribe(response => {
      this.eventosQuemados = response;
    });
  }

  
}
