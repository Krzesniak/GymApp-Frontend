import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainApplicationRoutingModule } from './main-application-routing.module';
import { MainApplicationComponent } from './main-application.component';
import { UserInfoComponent } from './user/user-info/user-info.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import { AdminPanelComponent } from './user/admin-panel/admin-panel.component';
import {MatTabsModule} from "@angular/material/tabs";
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [
    MainApplicationComponent,
    UserInfoComponent,
    AdminPanelComponent
  ],
  imports: [
    CommonModule,
    MainApplicationRoutingModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatIconModule
  ]
})
export class MainApplicationModule { }
