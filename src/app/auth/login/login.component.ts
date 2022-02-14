import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginData } from 'src/app/interfaces/loginData';
import { AuthService } from '../../../service/service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router) {}

  ngOnInit(): void {
  }

  
  loginWithGoogle() {
    /*this.authService
      .loginWithGoogle()
      .then(() => this.router.navigate(['/dashboard']))
      .catch((e) => console.log(e.message));*/
    this.authService
      .loginWithGoogle()
      .then(res => {
        console.log("Se registro: ", res);

        if (res != null) {
          this.router.navigate(['/inicio']);
        } else {
          this.router.navigate(['/home']);
        }
      });
  }

}
