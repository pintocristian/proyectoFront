import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Roles } from 'src/app/interfaces/user';
import { AuthService } from 'src/service/service.service';
import { resourceLimits } from 'worker_threads';
import {finalize} from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { CountdownConfig, CountdownEvent } from 'ngx-countdown';

const KEY = 'time';
const DEFAULT = 7200; //7200 son 2 horas

@Component({
  selector: 'app-caidalibre',
  templateUrl: './caidalibre.component.html',
  styleUrls: ['./caidalibre.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CaidalibreComponent implements OnInit {

  view: [number, number] = [614, 400];

  rol : String = "";
  rol$ = this.rol;
  //bandera : Boolean = false;
  bandera$ : Boolean; 

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

  //JSON de la prueba
  multi = [
    {
      "name": "Germany",
      "series": [
        {
          "name": "2010",
          "value": 7300000
        },
        {
          "name": "2011",
          "value": 8940000
        }
      ]
    },
  
    {
      "name": "USA",
      "series": [
        {
          "name": "2010",
          "value": 7870000
        },
        {
          "name": "2011",
          "value": 8270000
        }
      ]
    },
  
    {
      "name": "France",
      "series": [
        {
          "name": "2010",
          "value": 5000002
        },
        {
          "name": "2011",
          "value": 5800000
        }
      ]
    }
  ];

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  constructor(private authSvc: AuthService, private router:Router,private readonly cookieService: CookieService) { }

  //public user$: Observable<any> = this.authSvc.afAuth.user;
  ngOnInit(): void {
    this.authSvc.saberRol().subscribe(respuesta => {
      this.rol$ = respuesta
    });
    if (this.cookieService.check('Token_access')) {
      this.router.navigate(['/caidalibre']);
    } else {
      this.router.navigate(['/home'])
    }

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

  prueba(){
    if(this.bandera$ == false){
      return false;
    }else{
      return true;
    }
  }

  verificar(){
    this.authSvc.saberCodigoGrupo().subscribe(respuesta => {
      this.authSvc.verificarGrupoCompleto(respuesta).pipe(finalize(() => this.prueba())).subscribe((result:any)=>{this.bandera$=result})
    });
    //window.location.reload();
  }

  /*public eslider (): boolean{
    if(this.rol.indexOf('Lider') ){
      return false;
    }
    return true;
    
  }

  public esespectador(): boolean {
    if(this.rol.indexOf('Observador')){
      return false;
    }
    return true;
  }

  public liderpreparado(): boolean {
    if(this.variableespectadores.indexOf('preparado')){
      return false;
    }
    return true;
  }

  public lidernopreparado(): boolean {
    if(this.liderpreparado() == true){
      return false;
    }
    return true;
  }*/






  descargar() {
    //this.authSvc.descargar();
  }

  async Ontraerol() {
    try {
      await this.authSvc.traerrol();

    } catch (error) {
      console.log(error);
    }
  }

  config: CountdownConfig = { leftTime: DEFAULT, notify: 0 };

}
