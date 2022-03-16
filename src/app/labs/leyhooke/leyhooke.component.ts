import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CountdownConfig, CountdownEvent } from 'ngx-countdown';
import { finalize } from 'rxjs';
import { AuthService } from 'src/service/service.service';
import { ChartConfiguration, ChartData, ChartType, ChartOptions, Chart } from 'chart.js';
import Swal from 'sweetalert2';

var KEY = 'timeLH';
var DEFAULT = 0; //3600 es 1 hora


@Component({
  selector: 'app-leyhooke',
  templateUrl: './leyhooke.component.html',
  styleUrls: ['./leyhooke.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeyhookeComponent implements OnInit {

  public listadoOpPesos: any = [];
  public listadoOpFuerza: any = [];
  bandera$: Boolean;
  rol: String = "";
  rol$ = this.rol;

  private COD_LAB: number = 1;

  public user$ = this.cookieService.get('Token_email');
  public userName$ = this.cookieService.get('Token_name');
  public userPhoto$ = this.cookieService.get('Token_photo');

  disabled_FinalizarPractica: Boolean = true;
  disabled_FinalizarSimulacion: Boolean = true;
  disabled_Iniciar: Boolean = false;
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
    this.listarElongaciones();
    this.listarPesos();
    this.authSvc.obtenerOpcionesLH_Pesos(this.COD_LAB).subscribe(respuesta => { this.listadoOpPesos = respuesta });
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
    });
  }

  handleEvent(ev: CountdownEvent) {
    if (ev.action === 'notify') {
      // Save current value
      localStorage.setItem(KEY, `${ev.left / 1000}`);
    }
  }

  timesUp(event: CountdownEvent) {
    if (event.action == "done") {
      console.log("Finished");
      localStorage.clear();
      localStorage.removeItem(KEY);
      this.router.navigate(['/materias']);
    }
  }

  public inicio(peso:any) {
    peso = document.getElementById('peso');
    var val_peso = peso.value;
    Swal.fire({
      icon:'info', title:'Peso: '+ val_peso,
      timer: 3000,
      timerProgressBar: true,
    })
    //alert("Peso: " + val_peso);
    this.authSvc.InicioLeyHooke(val_peso).subscribe((result: any) => {
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
    this.disabled_Iniciar = true;
    this.authSvc.finalizarSimulacion(this.COD_LAB).subscribe((result: any) => {
      if (result == true) {
        Swal.fire({
          icon:'info', title:'Puso Verdadero',
          timer: 3000,
          timerProgressBar: true,
        })
        //alert("Puso true");
      } else {
        Swal.fire({
          icon:'info', title:'Puso Falso',
          timer: 3000,
          timerProgressBar: true,
        })
        //alert("Puso false");
      }
    });
  }

  finalizarPractica() {
    Swal.fire({
      icon:'success', title:'¡Practica Finalizada!',
      timer: 3000,
      timerProgressBar: true,
    })
    this.authSvc.saberCodigoGrupo().subscribe(respuesta => {
      this.authSvc.finalizarPractica(respuesta).subscribe((result: any) => { result })
      this.router.navigate(['/materias'])
    });
  }

  descargar() {
    this.authSvc.descargar(this.COD_LAB).subscribe((result) => {
      result
      if (result == true) {
        Swal.fire({
          icon:'success', title:'¡Archivo descargado exitosamente!', text:'revisa tu carpeta de descargas.',
          timer: 3000,
          timerProgressBar: true,
        })
      } else {
        Swal.fire({
          icon:'error', title:'¡Archivo NO descargado!', text:'No se ha podido descargar el Archivo.',
          timer: 3000,
          timerProgressBar: true,
        })
      }
    });
    this.disabled_FinalizarPractica = false;
  }



  async reportarFalla() {
    console.log("reportarFalla()");
    const { value: email } = await Swal.fire({
      title: 'Ingresar el email del responsable',
      input: 'email',
      inputLabel: 'Ingrese el email',
      inputPlaceholder: 'Ingrese el email'
    })
    
    if (email) {
      Swal.fire(`Entered email: ${email}`)
    }

    const { value: text } = await Swal.fire({
      input: 'textarea',
      inputLabel: 'Reportar Falla',
      inputPlaceholder: 'Escribir su error...',
      inputAttributes: {
        'aria-label': 'Escriba su mensaje aquí'
      },
      showCancelButton: true
    })
    
    if (text) {
      Swal.fire(text)
    }
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
    this.authSvc.obtenerDatosLHElongaciones(1).subscribe((result: any) => {
      this.lista1 = result;

      for (var i = 0; i < this.lista1.length; i++) {
        this.listadoElongaciones.push(this.lista1[i]);
        console.log(this.listadoElongaciones);
      }
    });
  }

  public listarPesos() {
    console.log("entro a listar pesos");
    this.authSvc.obtenerDatosLHPesos(1).subscribe((result: any) => {
      this.lista2 = result;

      for (var i = 0; i < this.lista2.length; i++) {
        this.listadoPesos.push(this.lista2[i]);
        console.log(this.listadoPesos);
      }
    });
  }






}
