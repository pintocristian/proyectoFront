import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, getAdditionalUserInfo, getAuth, GoogleAuthProvider, signInWithPopup, signOut, UserCredential } from 'firebase/auth';
import { first, Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user';
//import { LoginData } from '../interfaces/login-data';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class AuthService {


  private API_BASE = 'http://localhost:8080/usuario';

  logeado: import("@angular/fire/auth").User;

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
  }

//return this.httpClient.get(`${this.API_BASE}/pdf`).subscribe(result => this.data = result);
}
