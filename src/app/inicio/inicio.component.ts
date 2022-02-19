import { Component, OnInit } from '@angular/core';
import { authInstanceFactory } from '@angular/fire/auth/auth.module';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { AuthService } from 'src/service/service.service';
import { createUserWithEmailAndPassword, getAdditionalUserInfo, getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/interfaces/user';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { VincularmateriaComponent } from '../vincularmateria/vincularmateria/vincularmateria.component';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})



export class InicioComponent implements OnInit {

  constructor(public authService: AuthService, private router: Router, private cookieService: CookieService, private httpClient: HttpClient, private auth: Auth, public dialog: MatDialog) { }
  public user$ = this.cookieService.get('Token_email');
  public listado : any = [];



  
  ngOnInit(): void {
    this.authService.verCursosMatriculados().subscribe(respuesta => {this.listado = respuesta});
  }

  onLogout() {
    try {
      this.authService.logout();
      this.cookieService.delete('Token_access', '')
      this.cookieService.delete('Token_email', '')
      this.router.navigate(['/login']);
    } catch (error) {
      console.log(error);
    }
  }

  materias: string;
  codigo: number;

  openDialog(): void {
    const dialogRef = this.dialog.open(VincularmateriaComponent, {
      data: { name: this.codigo }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      this.codigo = result;
    });
  }

}
