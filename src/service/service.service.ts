import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, getAdditionalUserInfo, getAuth, GoogleAuthProvider, signInWithPopup, signOut, UserCredential } from 'firebase/auth';
import { first, Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { Agendamiento } from 'src/app/interfaces/agendamiento';
//import { LoginData } from '../interfaces/login-data';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  data = {};


  private API_BASE = 'http://localhost:8080/usuario';

  logeado: import("@angular/fire/auth").User;
  bandera: Boolean = false;

  public eventosQuemados: Agendamiento[];


  constructor(private auth: Auth, private httpClient: HttpClient) { }


  async loginWithGoogle() {
    try {
      var correo = signInWithPopup(this.auth, new GoogleAuthProvider());
      this.logeado = (await correo).user;
      var idx = (await correo).user?.email?.indexOf('@unicauca.edu.co');
      if (Number(idx) > -1) {
        alert("Bienvenido " + (await correo).user?.displayName);
        this.enviarDatos();
        return await correo;
      }
      alert("Error correo no universitario");
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }

  }

   enviarDatos() {
    console.log("Entro a enviarDatos()");
    //return this.httpClient.post(`${this.API_BASE}/`+this.logeado.email+ `/` +this.logeado.displayName+ `/ingresarUsuario`,this.logeado);
    return this.httpClient.post(`${this.API_BASE}/` + this.logeado.email + `/` + this.logeado.displayName + `/ingresarUsuario`, this.logeado).subscribe(result => this.data = result);
  }

  //return this.httpClient.get(`${this.API_BASE}/pdf`).subscribe(result => this.data = result);
  async logout(): Promise<void> {
    try {
      await this.auth.signOut();
    } catch (error) {
      console.log(error);
    }
  }

  /*descargar() {
    console.log('Descargó')
    //return this.httpClient.get(`${this.API_BASE}/pdf`).subscribe(result => this.data = result);

  }*/

  traerrol() {
    console.log('rol');
    //return this.httpClient.get(`${this.API_BASE}/rol`).subscribe(result => this.data = result);
  }

  codigos(codigo_materia: any) {
    console.log("Entro a matricular curso()");
    this.httpClient.post(`${this.API_BASE}/mellizohurt@unicauca.edu.co/` + codigo_materia + `/` + `matricularCurso`, codigo_materia).subscribe((result: any) => { this.bandera = result });
    return this.bandera;
  }

  //agendamiento():Observable<Agendamiento[]>{
  agendamiento(): Agendamiento[] {
    const event1: Agendamiento = {
      codigoGrupal: 1,
      codigoPlanta: '1',
      disposicion: true,
      year: 2022,
      month: 1,
      day: 16,
      horaInicio: '7',
      horaFin: '9',
      idAgendamiento: 11,
      idFranja: '11f'
    }
    const event2: Agendamiento = {
      codigoGrupal: 2,
      codigoPlanta: '2',
      disposicion: true,
      year: 2022,
      month: 1,
      day: 16,
      horaInicio: '14',
      horaFin: '16',
      idAgendamiento: 22,
      idFranja: '22f'
    }
    const event3: Agendamiento = {
      codigoGrupal: 3,
      codigoPlanta: '3',
      disposicion: true,
      year: 2022,
      month: 1,
      day: 16,
      horaInicio: '10',
      horaFin: '12',
      idAgendamiento: 33,
      idFranja: '33f'
    }
    this.eventosQuemados[0]=event1;
    this.eventosQuemados[0]=event2;
    this.eventosQuemados[0]=event3;
    return this.eventosQuemados;
  }
}
