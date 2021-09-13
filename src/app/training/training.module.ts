import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ExerciseListComponent} from "./exercise-list/exercise-list.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatCardModule} from "@angular/material/card";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {NgxSpinnerModule} from "ngx-spinner";
import {HttpClientModule} from "@angular/common/http";



@NgModule({
  declarations:
    [ExerciseListComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    FlexLayoutModule,
    MatIconModule,
    InfiniteScrollModule,
    NgxSpinnerModule,
    HttpClientModule
  ]
})
export class TrainingModule { }
