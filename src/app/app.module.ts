import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {ApplicationModule} from "./layouts/default/application.module";
import {AppRoutingModule} from "./app-routing.module";
import {TrainingModule} from "./main-application/training/training.module";
import {MealModule} from "./main-application/diet/meal.module";
import {HomeLayoutComponent} from './layouts/home-layout/home-layout.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatCardModule} from "@angular/material/card";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {AuthModule} from "./auth/auth.module";
import {FullCalendarModule} from "@fullcalendar/angular";
import {HomeModule} from "./home/home.module";


@NgModule({
  declarations: [
    AppComponent,
    HomeLayoutComponent
  ],
    imports: [
        AuthModule,
        BrowserModule,
        AppRoutingModule,
        NoopAnimationsModule,
        BrowserAnimationsModule,
        ApplicationModule,
        TrainingModule,
        MealModule,
        MatFormFieldModule,
        MatCardModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        FullCalendarModule,
        HomeModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
