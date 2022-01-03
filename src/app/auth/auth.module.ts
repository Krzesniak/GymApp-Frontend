import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from "./login/login.component";
import {MatCardModule} from "@angular/material/card";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {TokenInterceptor} from "./token-interceptor";
import {AuthService} from "../services/auth.service";
import {MatIconModule} from "@angular/material/icon";
import { RegistrationComponent } from './registration/registration.component';
import {MatStepperModule} from "@angular/material/stepper";
import {MatCheckboxModule} from "@angular/material/checkbox";



@NgModule({
  declarations: [LoginComponent, RegistrationComponent],
    imports: [
        CommonModule,
        MatCardModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        MatIconModule,
        MatStepperModule,
        MatCheckboxModule
    ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ]
})
export class AuthModule { }
