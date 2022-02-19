import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { add, addDays, addHours, addMinutes, startOfDay } from 'date-fns';
import { Agendamiento } from 'src/app/interfaces/agendamiento';
import { AuthService } from 'src/service/service.service';
import { IntegrantesPracticaComponent } from '../integrantesPractica/integrantesPractica.component';
import { colors } from '../utils/colors';



import { finalize } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-calendarCaidaLibre',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendarCaidaLibre.component.html',
  styleUrls: ['./calendarCaidaLibre.component.scss'],

  encapsulation: ViewEncapsulation.None
})
export class CalendarCaidaLibreComponent implements OnInit {

  eventSelected: Date;
  eventFranja: number;
  eventYear: number;
  eventMonth: number;
  eventDate: number;
  eventHour: number;
  eventMinute: number;

  events: CalendarEvent<{ id: number }>[];

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
    integrante_1: new FormControl('',[Validators.required , Validators.email]),
    integrante_3: new FormControl('',[Validators.required , Validators.email]),
    integrante_2: new FormControl('',[Validators.required , Validators.email]),
    
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
    this.eventSelected = event.start;
    this.eventFranja = event.meta.id;
    this.eventYear = event.start.getFullYear();
    this.eventMonth = event.start.getMonth();
    this.eventDate = event.start.getDate();
    this.eventHour = event.start.getHours();
    this.eventMinute = event.start.getMinutes();

    alert("Haz Clickeado el evento! Dia " + event.start.getDate() + " Hora " + event.start.getHours());

  }

  objAgendamiento: Agendamiento;

  enviarIntegrantes() {
    var arrayIntergrantes= [this.integrantes.value.integrante_1,
      this.integrantes.value.integrante_2,
      this.integrantes.value.integrante_3];
    var rta = -5;
    this.authSvc.enviarIntegrantes(
      this.eventFranja,
      arrayIntergrantes
      ).subscribe((respuesta)=>{rta = respuesta
      console.log(rta)
      if(rta==1){
        alert("¡Practica agendada exitosamente!");
      }else if(rta==0){
        alert("Envio un correo no universitario")
      }
    });
  }


  asingacionEventos() {
    var objCalendario: CalendarEvent<{ id: number }>[] = [];
    var contador = 0;
    this.eventosQuemados.forEach((agendamiento: Agendamiento) => {

      objCalendario[contador] = {
        start:  addHours(startOfDay(new Date(agendamiento.anio, (agendamiento.mes -1), agendamiento.dia)), agendamiento.horaInicio),
        title: 'Practica Caida Libre 1',
        color: colors.red,
        meta:{
          id: agendamiento.idAgendamiento,
        }
        
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
