import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DietListComponent} from "./meal/diet-list.component";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {NgxSpinnerModule} from "ngx-spinner";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MealDetailsComponent} from "./meal-details/meal-details.component";
import {MatDialogModule} from "@angular/material/dialog";


@NgModule({
  declarations: [
    DietListComponent,
    MealDetailsComponent
  ],
  imports: [
    CommonModule,
    InfiniteScrollModule,
    NgxSpinnerModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    FlexLayoutModule,
    MatToolbarModule
  ]
})
export class MealModule { }
