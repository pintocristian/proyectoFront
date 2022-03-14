import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CountdownConfig, CountdownEvent } from 'ngx-countdown';
import { finalize } from 'rxjs';
import { AuthService } from 'src/service/service.service';
import { ChartConfiguration, ChartData, ChartType, ChartOptions, Chart } from 'chart.js';
import Swal from 'sweetalert2';

const KEY = 'timeLH';
var DEFAULT = 1800; //3600 es 1 hora


@Component({
  selector: 'app-leyhooke',
  templateUrl: './leyhooke.component.html',
  styleUrls: ['./leyhooke.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeyhookeComponent implements OnInit {

  public listadoOpElongacion: any = [1, 2, 3, 4, 5, 6];
  public listadoOpFuerza: any = [1, 2, 3, 4, 5, 6];
  bandera$: Boolean;
  rol: String = "";
  rol$ = this.rol;

  private COD_LAB: number = 2;

  public user$ = this.cookieService.get('Token_email');
  public userName$ = this.cookieService.get('Token_name');
  public userPhoto$ = this.cookieService.get('Token_photo');

  disabled_FinalizarPractica: Boolean = true;
  disabled_FinalizarSimulacion: Boolean = true;
  bandera: Boolean;

  config: CountdownConfig = { leftTime: DEFAULT, notify: 0 };

  duracion$: number = 0;

  public lista1: any = [];
  public lista2: any = [];
  public listadoElongaciones: any = [];
  public listadoPesos: any = [];

  xValues = this.listadoPesos;
  yValues = this.listadoElongaciones;

  storageLeyHooke: Storage;

  constructor(private authSvc: AuthService, private router: Router, private readonly cookieService: CookieService) {
    //Object.assign(this, { multi })
  }



  ngOnInit(): void {
    this.verificarDuracion();
    this.authSvc.obtenerOpcionesLH_Elongacion(this.COD_LAB).subscribe(respuesta => { this.listadoOpElongacion = respuesta });
    this.authSvc.obtenerOpcionesLH_Fuerza(this.COD_LAB).subscribe(respuesta => { this.listadoOpFuerza = respuesta });
    this.authSvc.saberRol().subscribe(respuesta => {
      this.rol$ = respuesta
    });
    if (this.cookieService.check('Token_access')) {
      this.router.navigate(['/leyhooke']);
    } else {
      this.router.navigate(['/login '])
    }


    //Cuenta regresiva
    let value = +localStorage.getItem(KEY)!! ?? DEFAULT;
    if (value <= 0) value = DEFAULT;
    this.config = { ...this.config, leftTime: value };

    new Chart("myChart", {
      type: "line",
      data: {
        labels: this.xValues,
        datasets: [{
          backgroundColor: "rgba(0,0,0,1.0)",
          borderColor: "rgba(0,0,0,0.1)",
          data: this.yValues,
          label: 'Mostrar Grafica (Confirmar)',
        }],
      },
      options: {
        scales: {
          yAxes: {min: 0, max:50},
      }
      },
    });
  }

  handleEvent(ev: CountdownEvent) {
    if (ev.action === 'notify') {
      // Save current value
      localStorage.setItem(KEY, `${ev.left / 1000}`);
    }
  }

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

  alerta() {
    Swal.fire({
      title: 'Estás saliendo de la practica!',
      text: "Ten cuidado estás por salir de la practica",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, deseo salir'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/materias'])
      }
    })
  }
  closeSwal() {
    throw new Error('Method not implemented.');
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

 

  reportarFalla() {
    console.log("reportarFalla()");
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

  verificarDuracion() {
    this.authSvc.saberCodigoGrupo().subscribe(respuesta => {
      this.authSvc.duracionPractica(respuesta, this.COD_LAB).pipe(finalize(() => this.prueba())).subscribe((result: any) => {
        console.log(result);
        this.duracion$ = result;
        DEFAULT = this.duracion$;
        console.log(DEFAULT);
      })
    });
  }

  public listarElongaciones() {
    console.log("entro a listar elongacion");
    this.authSvc.obtenerDatosLHElongaciones(1).pipe(finalize(() => this.prueba())).subscribe((result: any) => {
      this.lista1 = result;
      console.log(result);

      for (var i = 0; i < this.lista1.length; i++) {
        this.listadoElongaciones.push(this.lista1[i]);
        console.log(this.listadoElongaciones);
      }
    });
  }

  public listarPesos() {
    console.log("entro a listar pesos");
    this.authSvc.obtenerDatosLHPesos(1).pipe(finalize(() => this.prueba())).subscribe((result: any) => {
      this.lista2 = result;
      console.log(result);

      for (var i = 0; i < this.lista2.length; i++) {
        this.listadoPesos.push(this.lista2[i]);
        console.log(this.listadoPesos);
      }
    });
  }

  




}
