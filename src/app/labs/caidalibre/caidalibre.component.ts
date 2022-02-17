import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Roles } from 'src/app/interfaces/user';
import { AuthService } from 'src/service/service.service';
import { resourceLimits } from 'worker_threads';
import {finalize} from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-caidalibre',
  templateUrl: './caidalibre.component.html',
  styleUrls: ['./caidalibre.component.scss']
})
export class CaidalibreComponent implements OnInit {
  rol : String = "";
  rol$ = this.rol;
  //bandera : Boolean = false;
  bandera$ : Boolean; 


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

}
