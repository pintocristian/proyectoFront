import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginData } from 'src/app/interfaces/loginData';
import { AuthService } from '../../../service/service.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly cookieService: CookieService) {}

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
        if (res != null){
          this.cookieService.set('Token_access', res.user.refreshToken ,4, '/');
          this.router.navigate(['/inicio']);
        } else {
          this.router.navigate(['/home']);
        }
        
      })
      
  }

}
