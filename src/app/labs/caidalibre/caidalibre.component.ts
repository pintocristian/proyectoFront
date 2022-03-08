import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Roles } from 'src/app/interfaces/user';
import { AuthService } from 'src/service/service.service';
import { resourceLimits } from 'worker_threads';
import { finalize } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { CountdownConfig, CountdownEvent } from 'ngx-countdown';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';


const KEY = 'time';
const DEFAULT = 1800; //3600 es 1 hora

@Component({
  selector: 'app-caidalibre',
  templateUrl: './caidalibre.component.html',
  styleUrls: ['./caidalibre.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CaidalibreComponent implements OnInit {

  rol: String = "";
  rol$ = this.rol;
  bandera$: Boolean;

  private COD_LAB: number = 1;

  public scatterChartOptions: ChartConfiguration['options'] = {
    responsive: true,
  };
  public scatterChartLabels: string[] = ['Eating'/*, 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'*/];

  public scatterChartData: ChartData<'scatter'> = {
    labels: this.scatterChartLabels,
    datasets: [
      {
        data: [
          { x: 1, y: 1 },
          { x: 2, y: 3 },
          { x: 3, y: -2 },
          { x: 4, y: 4 },
          { x: 5, y: -2 },
        ],
        label: 'Gráfica X y Y',
        pointRadius: 5,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
      }, 
    ]
  };
  public scatterChartType: ChartType = 'scatter';

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public user$ = this.cookieService.get('Token_email');
  public userName$ = this.cookieService.get('Token_name');
  public userPhoto$ = this.cookieService.get('Token_photo');


  public listadoOpciones: any = [1, 2, 3, 4, 5, 6];


  constructor(private authSvc: AuthService, private router: Router, private readonly cookieService: CookieService) { }

  //public user$: Observable<any> = this.authSvc.afAuth.user;
  ngOnInit(): void {
    this.authSvc.obtenerOpcionesCL(this.COD_LAB).subscribe(respuesta => { this.listadoOpciones = respuesta });
    this.authSvc.saberRol().subscribe(respuesta => {
      this.rol$ = respuesta
    });
    if (this.cookieService.check('Token_access')) {
      this.router.navigate(['/caidalibre']);
    } else {
      this.router.navigate(['/home'])
    }
    //Cuenta regresiva
    let value = +localStorage.getItem(KEY)!! ?? DEFAULT;
    if (value <= 0) value = DEFAULT;
    this.config = { ...this.config, leftTime: value };
  }

  handleEvent(ev: CountdownEvent) {
    if (ev.action === 'notify') {
      // Save current value
      localStorage.setItem(KEY, `${ev.left / 1000}`);
    }
  }

  finalizar_practica() {
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
    this.authSvc.descargar();
  }

  config: CountdownConfig = { leftTime: DEFAULT, notify: 0 };



}
