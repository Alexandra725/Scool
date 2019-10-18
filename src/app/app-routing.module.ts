import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { CoursesComponent } from './components/courses/courses.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { SettingsComponent } from './components/settings/settings.component';
import { SurveyComponent } from './components/survey/survey.component';
import { MainComponent } from './components/main/main.component';
import { LandingComponent } from './components/landing/landing.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'landing'},
  {path: 'auth', component: AuthComponent},
  {path: 'courses', component: CoursesComponent},
  {path: 'login-form', component: LoginFormComponent},
  {path: 'register-form', component: RegisterFormComponent},
  {path: 'settings', component: SettingsComponent},
  {path: 'survey', component: SurveyComponent},
  {path: 'main', component: MainComponent},
  {path: 'landing', component: LandingComponent},
];

const mainModuleRoutes: Routes = [
  {
      path: 'main',            // <---- parent component declared here
      component: MainComponent,
      children: [                          // <---- child components declared here
          {
              path: 'settings',
              component: SettingsComponent
          },
          {
              path: 'courses',
              component: CoursesComponent
          }
      ]
  }
];

const authModulesRoutes: Routes = [
  {
      path: 'auth',            // <---- parent component declared here
      component: AuthComponent,
      children: [                          // <---- child components declared here
        {
              path: 'register-form',
              component: RegisterFormComponent
        },
        {
              path: 'login-form',
              component: LoginFormComponent
        }
    ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes),
            RouterModule.forChild(mainModuleRoutes),
            RouterModule.forChild(authModulesRoutes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
