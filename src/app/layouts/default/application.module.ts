import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ApplicationComponent} from "./application.component";
import {DashboardComponent} from "../../modules/dashboard/dashboard.component";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import {MatSidenavModule} from "@angular/material/sidenav";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [
    ApplicationComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    MatDividerModule,
    FlexLayoutModule,
    MatCardModule,
    MatPaginatorModule,
    MatTableModule,
    MatToolbarModule,
    MatIconModule
  ]
})
export class ApplicationModule { }
