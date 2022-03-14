import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDatepickerKeyboardService } from '@ng-bootstrap/ng-bootstrap';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { child, DatabaseReference, get } from 'firebase/database';
import { CookieService } from 'ngx-cookie-service';
import { CountdownConfig, CountdownEvent } from 'ngx-countdown';
import { finalize } from 'rxjs';
import { ServiceRealTimeService } from 'src/app/service/service-real-time.service';
import { AuthService } from 'src/service/service.service';


const KEY = 'timeMP';
const DEFAULT = 0; //3600 es 1 hora

@Component({
  selector: 'app-movparabolico',
  templateUrl: './movparabolico.component.html',
  styleUrls: ['./movparabolico.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovparabolicoComponent implements OnInit {
  db: DatabaseReference;
  tematica: string = '';

  //Gráficas
  public scatterChartOptions: ChartConfiguration['options'] = {
    responsive: true,
  };
  public scatterChartLabels: string[] = ['Eating'];

  public scatterChartData: ChartData<'scatter'> = {
    labels: this.scatterChartLabels,
    datasets: [
      {
        data: [
          { x: 1, y: 1 },
          { x: 2, y: 3 },
          { x: 3, y: -2 },
          { x: 4, y: 4 },
          { x: 5, y: -3 },
        ],
        label: this.tematica,
        pointRadius: 5,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
      },
      {
        data: [
          { x: 2, y: 2 },
          { x: 6, y: 3 },
          { x: 2, y: -3 },
          { x: 9, y: 8 },
          { x: 15, y: -5 },
        ],
        label: 'Gráfica Y vs H',
        pointRadius: 5,
        borderColor: 'rgba(51, 91, 255, 1)',
        backgroundColor: 'rgba(51, 91, 255, 0.2)',
      },
    ]
  };
  public scatterChartType: ChartType = 'scatter';

  rol: String = "";
  rol$ = this.rol;
  bandera$: Boolean;

  private COD_LAB: number = 3;

  //Eventos gráficas
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public user$ = this.cookieService.get('Token_email');
  public userName$ = this.cookieService.get('Token_name');
  public userPhoto$ = this.cookieService.get('Token_photo');


  public listadoOpAngulo: any = [];
  public listadoOpVelocidad: any = [];

  storageMovParabolico: Storage;

  constructor(private authSvc: AuthService, private router: Router, private readonly cookieService: CookieService, private dbService: ServiceRealTimeService) {
    
  }

  conexionRealTime() {
    get(child(this.db.ref, 'guias/-LfMZIgigD9gfaBLeupS/tematica')).then((res) => {
      if (res.exists()) {
        console.log(res.val());
        this.tematica = res.val();
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }


  //public user$: Observable<any> = this.authSvc.afAuth.user;
  ngOnInit(): void {
    this.db = this.dbService.getDatabase();
    this.conexionRealTime();
    this.authSvc.obtenerOpcionesMP_Angulo(this.COD_LAB).subscribe(respuesta => { this.listadoOpAngulo = respuesta });
    this.authSvc.obtenerOpcionesMP_Velocidad(this.COD_LAB).subscribe(respuesta => { this.listadoOpVelocidad = respuesta });
    this.authSvc.saberRol().subscribe(respuesta => {
      this.rol$ = respuesta
    });
    if (this.cookieService.check('Token_access')) {
      this.router.navigate(['/movparabolico']);
    } else {
      this.router.navigate(['/home'])
    }
    //Cuenta regresiva
    let value = +this.storageMovParabolico.getItem(KEY)!! ?? DEFAULT;
    if (value <= 0) value = DEFAULT;
    this.config = { ...this.config, leftTime: value };
  }

  handleEvent(ev: CountdownEvent) {
    if (ev.action === 'notify') {
      // Save current value
      this.storageMovParabolico.setItem(KEY, `${ev.left / 1000}`);
    }
  }

  disabled_FinalizarPractica: Boolean = true;
  disabled_FinalizarSimulacion: Boolean = true;
  bandera: Boolean;

  public inicio() {
    this.authSvc.Iniciopractica().subscribe((result: any) => {
      this.bandera = result
      if (this.bandera == false) {
        console.log('Entro false')
      } else {
        console.log('Entro true');
      }
    });

  }

  finalizarSimulaciones() {
    this.disabled_FinalizarSimulacion = false;
  }

  finalizarPractica() {
    this.authSvc.saberCodigoGrupo().subscribe(respuesta => {
      this.authSvc.finalizarPractica(respuesta).subscribe((result: any) => { result })
      this.router.navigate(['/materias'])
    });
  }

  prueba() {
    if (this.bandera$ == false) {
      return false;
    } else {
      return true;
    }
  }

  verificar() {
    this.authSvc.saberCodigoGrupo().subscribe(respuesta => {
      this.authSvc.verificarGrupoCompleto(respuesta).pipe(finalize(() => this.prueba())).subscribe((result: any) => { this.bandera$ = result })
    });
    //window.location.reload();
  }

  descargar() {
    //this.authSvc.descargar();
    this.disabled_FinalizarPractica = false;
    alert("Boton activado");
  }

  reportarFalla(){
    console.log("reportarFalla()");
  }

  config: CountdownConfig = { leftTime: DEFAULT, notify: 0 };



}
