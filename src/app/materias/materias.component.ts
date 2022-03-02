import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from 'src/service/service.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.scss']
})
export class MateriasComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private cookieService: CookieService) { }

  public user$ = this.cookieService.get('Token_email');
  public userName$ = this.cookieService.get('Token_name');
  public userPhoto$ = this.cookieService.get('Token_photo');

  ngOnInit(): void {
  }

  bandera: Boolean = false;

  verificarAgendamiento() {
    this.authService.saberCodigoGrupo().subscribe(respuesta=> {this.authService.verificarAgendamientoGrupo(respuesta).pipe(finalize(() => this.prueba())).subscribe((result: any) => { this.bandera=result })
  });
  }

  prueba(){
    if (this.bandera) {
      this.router.navigate(['/caidalibre']);
    } else {
      alert('No tienes practicas agendadas en este horario');
  
    }
  }
}
