import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import {SharedModule} from "../shared/shared.module";
import { HomeHeaderComponent } from './home-header/home-header.component';
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatButtonModule} from "@angular/material/button";
import { StartingPageComponent } from './starting-page/starting-page.component';
import {MatCardModule} from "@angular/material/card";


@NgModule({
    declarations: [
        HomeComponent,
        HomeHeaderComponent,
        StartingPageComponent
    ],
    exports: [
        HomeHeaderComponent
    ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        SharedModule,
        MatMenuModule,
        MatIconModule,
        MatToolbarModule,
        FlexLayoutModule,
        MatButtonModule,
        MatCardModule
    ]
})
export class HomeModule { }
