import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, getAdditionalUserInfo, getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
//import { LoginData } from '../interfaces/login-data';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  data = {};

  private API_BASE = 'http://localhost:8080/laboratorio';
  constructor(private auth: Auth, private readonly cookieService: CookieService, private httpClient: HttpClient) { }

  async loginWithGoogle() {
    try {
      var correo = signInWithPopup(this.auth, new GoogleAuthProvider());
      var idx = (await correo).user?.email?.indexOf('@unicauca.edu.co');
      if (Number(idx) > -1) {
        alert("Bienvenido " + (await correo).user?.displayName);
        console.log()
        return await correo;
      }
      alert("Error correo no universitario");
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }

  }

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

  codigos(data:any) {
    console.log("Entro a enviarDatos()");
    //return this.httpClient.post(`${this.API_BASE}/`+this.logeado.email+ `/` +this.logeado.displayName+ `/ingresarUsuario`,this.logeado);
    return this.httpClient.post(`${this.API_BASE}/`+this.data+ `/` + `/matricularcurso`,this.data).subscribe(result => this.data = result);
  }
}
