import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  openDrawerMenu(){
    var x = document.getElementById("mainNavBar")!;
    if (x.className === "navBar"){
      x.className += " responsive";
    } else {
      x.className = "navBar";
    }
  }
}
