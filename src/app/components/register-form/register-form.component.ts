import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersServiceService, AlertService } from 'src/app/services/index';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent {
    model: any = {};
    loading = false;

    registerForm = { nombre: '', apellido: '', user: '', email: '', password: '', surveyResult: 'empty', courses: 'empty'};

  constructor(
    public userService: UsersServiceService,
    public router: Router,
    public alertService: AlertService
  ) { }


  register() {
    this.loading = true;
    this.userService.createUser(this.registerForm)
    .subscribe(
      data => {
        localStorage.setItem('user',JSON.stringify(data));
          this.router.navigate(['/survey']);
          this.alertService.success('¡Registro realizado!', true);
    },
      error => {
          this.alertService.error(error);
          this.loading = false;
    });
  }
}
