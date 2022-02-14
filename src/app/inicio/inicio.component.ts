import { Component, OnInit } from '@angular/core';
import { authInstanceFactory } from '@angular/fire/auth/auth.module';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { AuthService } from 'src/service/service.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})



export class InicioComponent implements OnInit {

  constructor(private authSvc: AuthService) { }

  public user$ = this.authSvc.logeado;
  

  ngOnInit(): void {
  }
}
