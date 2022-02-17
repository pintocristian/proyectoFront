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
  private API_BASE_LAB = 'http://localhost:8080/laboratorio';

  logeado: import("@angular/fire/auth").User;
  bandera: Boolean = false;

  public eventosQuemados: any = [];


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
    console.log(this.bandera);
    return this.bandera;
  }

  enviarIntegrantes(eventFranja: number, arrayIntergrantes: any[]) : Observable<number>{
    console.log("Entro a enviarIntegrantes");
    return this.httpClient.post<number>(`${this.API_BASE_LAB}/` + eventFranja + `/` + `agregarParticipantes`, arrayIntergrantes);
    
    
  }

  agendamiento(codigo_laboratorio : number): Observable<Agendamiento[]> {
    console.log("Entro a Agendamiento");
    return this.httpClient.get<Agendamiento[]>(`${this.API_BASE_LAB}/`+ codigo_laboratorio + `/listarAgendamiento`);
  }
}
