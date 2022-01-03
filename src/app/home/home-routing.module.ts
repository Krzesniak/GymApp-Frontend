import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "../auth/login/login.component";
import {StartingPageComponent} from "./starting-page/starting-page.component";
import {RegistrationComponent} from "../auth/registration/registration.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: StartingPageComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'registration',
        component: RegistrationComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
