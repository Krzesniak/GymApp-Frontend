import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainApplicationRoutingModule } from './main-application-routing.module';
import { MainApplicationComponent } from './main-application/main-application.component';


@NgModule({
  declarations: [
    MainApplicationComponent
  ],
  imports: [
    CommonModule,
    MainApplicationRoutingModule
  ]
})
export class MainApplicationModule { }
