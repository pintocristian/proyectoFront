import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/service/service.service';

@Component({
  selector: 'app-caidalibre',
  templateUrl: './caidalibre.component.html',
  styleUrls: ['./caidalibre.component.scss']
})
export class CaidalibreComponent implements OnInit {

  constructor(private authSvc: AuthService, private router:Router) { }
  //public user$: Observable<any> = this.authSvc.afAuth.user;
  ngOnInit(): void {
  }

  descargar() {
    //this.authSvc.descargar();
  }

}
