import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-integrantesPractica',
  templateUrl: './integrantesPractica.component.html',
  styleUrls: ['./integrantesPractica.component.scss']
})
export class IntegrantesPracticaComponent implements OnInit {

  constructor(public dialogRef:MatDialogRef<IntegrantesPracticaComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(){}

}
