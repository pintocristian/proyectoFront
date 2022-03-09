import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { reload } from 'firebase/auth';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'proyectoFront';

  
  constructor(private readonly router: Router,
    private readonly cookieService: CookieService) { }
  
    ngOnInit(): void {
      
    /*if (this.cookieService.check('Token_access')) {
      this.router.navigate(['/inicio']);
    } else {
      this.router.navigate(['/home'])
    }*/

  }
}
