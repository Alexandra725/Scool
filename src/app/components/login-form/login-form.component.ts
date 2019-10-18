import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/services/index';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;

  loginForm = { email: '', password: ''};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.authenticationService.logout(); // resetear login
    //  el siguiente this. de abajo significa => obtener URL desde el parámetro de la URL o por defecto ir hacia '/'
  }

  login() {
    this.loading = true;
    this.authenticationService.login(this.loginForm.email, this.loginForm.password)
        .subscribe(
          data => {
          localStorage.setItem('user',JSON.stringify(data.message));
            //this.router.navigate(['/main/courses']);
          },
          error => {
            this.alertService.error(error);
            this.loading = false;
          });
  }
}
