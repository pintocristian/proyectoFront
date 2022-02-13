import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Roles } from 'src/app/interfaces/user';
import { AuthService } from 'src/service/service.service';

@Component({
  selector: 'app-caidalibre',
  templateUrl: './caidalibre.component.html',
  styleUrls: ['./caidalibre.component.scss']
})
export class CaidalibreComponent implements OnInit {
  rol = 'admin';
  variableespectadores = 'no-preparado';


  constructor(private authSvc: AuthService, private router:Router) { }
  //public user$: Observable<any> = this.authSvc.afAuth.user;
  ngOnInit(): void {
  }

  public eslider (): boolean{
    if(this.rol.indexOf('admin') ){
      return false;
    }
    return true;
    
  }

  public esespectador(): boolean {
    if(this.rol.indexOf('espectador')){
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
  }






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
