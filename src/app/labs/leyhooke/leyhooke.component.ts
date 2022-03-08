import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CountdownConfig, CountdownEvent } from 'ngx-countdown';
import { finalize } from 'rxjs';
import { AuthService } from 'src/service/service.service';

const KEY = 'time';
const DEFAULT = 7200; //7200 son 2 horas


@Component({
  selector: 'app-leyhooke',
  templateUrl: './leyhooke.component.html',
  styleUrls: ['./leyhooke.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeyhookeComponent implements OnInit {

  view: [number, number] = [614, 400];

  public listadoOpElongacion: any = [1,2,3,4,5,6];
  public listadoOpFuerza: any = [1,2,3,4,5,6];
  bandera$ : Boolean; 
  rol : String = "";
  rol$ = this.rol;

  private COD_LAB: number = 2;

  // opciones de la gráfica
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Country';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Population';
  legendTitle: string = 'Years';

  colorScheme = [
    { name: "verde", value: '#5AA454' },
    { name: "amarillo", value: '#C7B42C' }//,
    //{ name: "gris", value: '#AAAAAA' }
  ]

  constructor(private authSvc: AuthService, private router:Router,private readonly cookieService: CookieService) {
    //Object.assign(this, { multi })
  }

 onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
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

  descargar() {
    this.authSvc.descargar();
  }

  finalizar_practica() {
    this.authSvc.saberCodigoGrupo().subscribe(respuesta => {
      this.authSvc.finalizarPractica(respuesta).subscribe((result: any) => { result })
      this.router.navigate(['/materias'])
    });
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
