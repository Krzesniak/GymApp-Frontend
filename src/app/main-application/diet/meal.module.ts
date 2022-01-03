import {LOCALE_ID, NgModule} from '@angular/core';
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
import { DietPlanComponent } from './diet-plan/diet-plan.component';
import {MatButtonModule} from "@angular/material/button";
import { DietFiltersComponent } from './diet-filters/diet-filters.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatInputModule} from "@angular/material/input";
import { DietStatisticsComponent } from './diet-statistics/diet-statistics.component';
import {HighchartsChartModule} from "highcharts-angular";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatMenuModule} from "@angular/material/menu";
import { AddMealComponent } from './add-meal/add-meal.component';
import { IngredientFilterComponent } from './add-meal/ingredient-filter/ingredient-filter.component';
import { MeasurementComponent } from './measurement/measurement.component';
import { AddMeasurementComponent } from './measurement/add-measurement/add-measurement.component';


@NgModule({
  declarations: [
    DietListComponent,
    MealDetailsComponent,
    DietPlanComponent,
    DietFiltersComponent,
    DietStatisticsComponent,
    AddMealComponent,
    IngredientFilterComponent,
    MeasurementComponent,
    AddMeasurementComponent
  ],
    imports: [
        CommonModule,
        InfiniteScrollModule,
        NgxSpinnerModule,
        MatCardModule,
        MatIconModule,
        MatDialogModule,
        FlexLayoutModule,
        MatToolbarModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatTableModule,
        MatPaginatorModule,
        MatInputModule,
        HighchartsChartModule,
        MatButtonToggleModule,
        FormsModule,
        MatMenuModule
    ]
})
export class MealModule { }
