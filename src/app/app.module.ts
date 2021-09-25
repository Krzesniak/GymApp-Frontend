import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {DefaultModule} from "./layouts/default/default.module";
import {AppRoutingModule} from "./app-routing.module";
import {TrainingModule} from "./training/training.module";
import { DietListComponent } from './diet/meal/diet-list.component';
import {MealModule} from "./diet/meal.module";
import { MealDetailsComponent } from './diet/meal-details/meal-details.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
    DefaultModule,
    TrainingModule,
    MealModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
