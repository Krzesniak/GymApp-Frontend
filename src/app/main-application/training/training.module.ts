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
import { TrainingOverviewComponent } from './training-overview/training-overview.component';
import {FullCalendarModule} from "@fullcalendar/angular";
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction';
import { TrainingDetailsComponent } from './training-details/training-details.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatTableModule} from "@angular/material/table";
import {TrainingAddFormComponent} from "./training-details/training-add-form/training-add-form.component";
import { TrainingEditFormComponent } from './training-details/training-edit-form/training-edit-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import { ExerciseRecordComponent } from './record/exercise-record/exercise-record.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import { ExerciseDetailsComponent } from './exercise-list/exercise-details/exercise-details.component';
import { StatisticsComponent } from './statistics/statistics.component';
import {HighchartsChartModule} from "highcharts-angular";
import { ExerciseFilterDialogComponent } from './statistics/exercise-filter-dialog/exercise-filter-dialog.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import { AddExerciseComponent } from './exercise-list/add-exercise/add-exercise.component';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);

@NgModule({
  declarations:
    [ExerciseListComponent, TrainingOverviewComponent, TrainingDetailsComponent, TrainingAddFormComponent, TrainingEditFormComponent, ExerciseRecordComponent, ExerciseDetailsComponent, StatisticsComponent, ExerciseFilterDialogComponent, AddExerciseComponent],
    imports: [
        CommonModule,
        MatCardModule,
        MatToolbarModule,
        MatButtonModule,
        FlexLayoutModule,
        MatIconModule,
        InfiniteScrollModule,
        NgxSpinnerModule,
        HttpClientModule,
        FullCalendarModule,
        MatDialogModule,
        MatTableModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatTooltipModule,
        MatAutocompleteModule,
        MatPaginatorModule,
        MatButtonToggleModule,
        FormsModule,
        HighchartsChartModule,
        MatDatepickerModule
    ]
})
export class TrainingModule { }
