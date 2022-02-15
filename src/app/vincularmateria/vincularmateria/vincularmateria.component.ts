import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AuthService } from 'src/service/service.service';

@Component({
  selector: 'app-vincularmateria',
  templateUrl: './vincularmateria.component.html',
  styleUrls: ['./vincularmateria.component.scss']
})
export class VincularmateriaComponent implements OnInit {

  constructor(public dialogRef:MatDialogRef<VincularmateriaComponent>,public authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
  }



  enviarcodigo(data:any){
    this.authService.enviarDatos(data);
  }

}
