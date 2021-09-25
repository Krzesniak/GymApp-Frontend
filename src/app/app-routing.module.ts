import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DefaultComponent} from './layouts/default/default.component';
import {DashboardComponent} from './modules/dashboard/dashboard.component';
import {ExerciseListComponent} from "./training/exercise-list/exercise-list.component";
import {DietListComponent} from "./diet/meal/diet-list.component";
import {MealDetailsComponent} from "./diet/meal-details/meal-details.component";

const routes: Routes = [{
  path: '',
  component: DefaultComponent,
  children: [{
    path: '',
    component: DashboardComponent
  }, {
    path: 'exercises',
    component: ExerciseListComponent
  },
    {
      path: 'meals',
      component: DietListComponent
    },
    {
      path: 'meals/:id',
      component: MealDetailsComponent
    }]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
