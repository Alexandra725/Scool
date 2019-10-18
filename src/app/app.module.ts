import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

// Routing module para router service
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';

// HttpClient module para RESTful API
import { HttpClientModule } from '@angular/common/http';

// Components
import { AuthComponent } from './components/auth/auth.component';
import { CoursesComponent } from './components/courses/courses.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { MainComponent } from './components/main/main.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { SettingsComponent } from './components/settings/settings.component';
import { SurveyComponent } from './components/survey/survey.component';
import { LandingComponent } from './components/landing/landing.component';
import { FormsModule } from '@angular/forms';
import { UsersServiceService, AlertService } from 'src/app/services/index';
import { AuthenticationService } from 'src/app/services/authentication.service';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    CoursesComponent,
    LoginFormComponent,
    MainComponent,
    RegisterFormComponent,
    SettingsComponent,
    SurveyComponent,
    LandingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule
  ],
  providers: [
    AlertService,
    UsersServiceService,
    AuthenticationService,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
