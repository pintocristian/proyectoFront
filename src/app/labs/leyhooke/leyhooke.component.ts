import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CountdownConfig, CountdownEvent } from 'ngx-countdown';
import { finalize } from 'rxjs';
import { AuthService } from 'src/service/service.service';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

const KEY = 'time';
const DEFAULT = 3600; //3600 es 1 hora


@Component({
  selector: 'app-leyhooke',
  templateUrl: './leyhooke.component.html',
  styleUrls: ['./leyhooke.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeyhookeComponent implements OnInit {

  //Opciones gráficas
  public scatterChartOptions: ChartConfiguration['options'] = {
    responsive: true,
  };

  public scatterChartLabels: string[] = [ 'Eating' ];

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
        label: 'Gráfica X y Y',
        pointRadius: 5,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
      },
    ]
  };
  public scatterChartType: ChartType = 'scatter';

  public listadoOpElongacion: any = [1,2,3,4,5,6];
  public listadoOpFuerza: any = [1,2,3,4,5,6];
  bandera$ : Boolean; 
  rol : String = "";
  rol$ = this.rol;

  private COD_LAB: number = 2;

  constructor(private authSvc: AuthService, private router:Router,private readonly cookieService: CookieService) {
    //Object.assign(this, { multi })
  }


  public user$ = this.cookieService.get('Token_email');
  public userName$ = this.cookieService.get('Token_name');
  public userPhoto$ = this.cookieService.get('Token_photo');


  config: CountdownConfig = { leftTime: DEFAULT, notify: 0 };

  ngOnInit(): void {
    this.authSvc.obtenerOpcionesLH_Elongacion(this.COD_LAB).subscribe(respuesta => {this.listadoOpElongacion = respuesta});
    this.authSvc.obtenerOpcionesLH_Fuerza(this.COD_LAB).subscribe(respuesta => {this.listadoOpFuerza = respuesta});
    this.authSvc.saberRol().subscribe(respuesta => {
      this.rol$ = respuesta
    });
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

  //Eventos gráficas
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
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
  
  descargar() {
    //this.authSvc.descargar();
    this.disabled_FinalizarPractica = false;
    alert("Boton activado");
  }

  finalizar_practica() {
    this.authSvc.saberCodigoGrupo().subscribe(respuesta => {
      this.authSvc.finalizarPractica(respuesta).subscribe((result: any) => { result })
      this.router.navigate(['/materias'])
    });
  }

  reportarFalla(){
    console.log("reportarFalla()");
  }

  verificar() {
    this.authSvc.saberCodigoGrupo().subscribe(respuesta => {
      this.authSvc.verificarGrupoCompleto(respuesta).pipe(finalize(() => this.prueba())).subscribe((result: any) => { this.bandera$ = result })
    });
    //window.location.reload();
  }
  
  prueba() {
    if (this.bandera$ == false) {
      return false;
    } else {
      return true;
    }
  }

  

  
}
