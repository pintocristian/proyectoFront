import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from 'src/service/service.service';

@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.scss']
})
export class MateriasComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  bandera: Boolean = false;

  verificarAgendamiento(codigo_planta:number) {
    this.authService.saberCodigoGrupo().subscribe(respuesta=> {this.authService.verificarAgendamientoGrupo(respuesta,codigo_planta).pipe(finalize(() => this.prueba())).subscribe((result: any) => { this.bandera=result })
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
