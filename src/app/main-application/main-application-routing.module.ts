import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainApplicationComponent} from "./main-application.component";
import {DashboardComponent} from "../modules/dashboard/dashboard.component";
import {ExerciseListComponent} from "./training/exercise-list/exercise-list.component";
import {DietListComponent} from "./diet/meal/diet-list.component";
import {MealDetailsComponent} from "./diet/meal-details/meal-details.component";
import {TrainingOverviewComponent} from "./training/training-overview/training-overview.component";
import {TrainingDetailsComponent} from "./training/training-details/training-details.component";
import {ExerciseRecordComponent} from "./training/record/exercise-record/exercise-record.component";
import {ExerciseDetailsComponent} from "./training/exercise-list/exercise-details/exercise-details.component";
import {StatisticsComponent} from "./training/statistics/statistics.component";
import {TrainingAddFormComponent} from "./training/training-details/training-add-form/training-add-form.component";
import {DietPlanComponent} from "./diet/diet-plan/diet-plan.component";
import {DietStatisticsComponent} from "./diet/diet-statistics/diet-statistics.component";
import {AuthGuardGuard} from "../auth/auth-guard.guard";
import {AddExerciseComponent} from "./training/exercise-list/add-exercise/add-exercise.component";
import {AddMealComponent} from "./diet/add-meal/add-meal.component";
import {MeasurementComponent} from "./diet/measurement/measurement.component";
import {UserInfoComponent} from "./user/user-info/user-info.component";
import {AdminPanelComponent} from "./user/admin-panel/admin-panel.component";
import {AddMeasurementComponent} from "./diet/measurement/add-measurement/add-measurement.component";

const routes: Routes = [
  {
    path: '',
    component: MainApplicationComponent,
    canActivate: [AuthGuardGuard],
    children: [{
      path: '',
      component: DashboardComponent
    },
      {
        path: 'user',
        component: UserInfoComponent
      },
      {
        path: 'admin-panel',
        component: AdminPanelComponent,
      },
      {
      path: 'exercises',
      component: ExerciseListComponent
    },
      {
        path: 'exercises/create',
        component: AddExerciseComponent
      },
      {
        path: 'exercises/:id',
        component: ExerciseDetailsComponent
      },
      {
        path: 'records/exercises',
        component: ExerciseRecordComponent
      },

      {
        path: 'trainings',
        component: TrainingOverviewComponent
      },
      {
        path: 'trainings/create',
        component: TrainingAddFormComponent
      },
      {
        path: 'trainings/:id',
        component: TrainingDetailsComponent
      },
      {
        path: 'meals',
        component: DietListComponent
      },
      {
        path: 'meals/create',
        component: AddMealComponent
      },
      {
        path: "measurement",
        component: MeasurementComponent
      }
      ,
      {
        path: "measurement/add",
        component: AddMeasurementComponent
      },
      {
        path: 'meals/:id',
        component: MealDetailsComponent
      },
      {
        path: 'diet-plan',
        component: DietPlanComponent
      },      {
        path: 'diet/statistics',
        component: DietStatisticsComponent
      },
      {
        path: 'training/statistics',
        component: StatisticsComponent
      }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainApplicationRoutingModule {
}
