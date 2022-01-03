import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {delay} from "rxjs/operators";
import {IExerciseHeader} from "../main-application/training/exercise-list/iexercise-header";
import {IMealDetails} from "../main-application/diet/meal-details/i-meal-details";
import {DietDay, DietIngredientsSum} from "../main-application/diet/diet-plan/diet-plan.component";
import {MealFilter} from "../main-application/diet/diet-filters/diet-filters.component";
import {ExerciseFilter} from "../main-application/training/statistics/exercise-filter-dialog/exercise-filter-dialog.component";
import {UnverifiedExercise, UnverifiedMeal} from "../main-application/user/admin-panel/admin-panel.component";

@Injectable({
  providedIn: 'root'
})
export class DietService {

  constructor(private httpClient:HttpClient) { }
  getMealsHeaderByPage(pageNumber: number,  searchStringP: any, mealTypeP: any, mealDifficultyP: any): Observable<any>{
    let params = new HttpParams();
    if(searchStringP !== '' ){
      params = params.append('searchString', searchStringP);
    }
    if(mealTypeP !== '') params = params.append('mealType', mealTypeP);
    if(mealDifficultyP !== '') params =  params.append('mealDifficulty', mealDifficultyP);
    params = params.append('pageNumber', pageNumber)
    return this.httpClient.get("http://localhost:8080/meals", {
      params: params
    });
  }
  getMealsForFilter(){
    return this.httpClient.get<MealFilter>("http://localhost:8080/meals");
  }

  getMealDetailsById(id: number): Observable<IMealDetails>{
    return this.httpClient.get<IMealDetails>(`http://localhost:8080/meals/${id}`);
  }
  getDietDetailsByDate(dateChosen: any) {
    return this.httpClient.get<DietDay>(`http://localhost:8080/diet/`, {
      params: {
        date: dateChosen
      }
    })
  }

  getFilteredMeals(searchText: any, mealTypeParams: any, mealDifficultyParam: any) {
    let params = new HttpParams();
    if(searchText !== '' ){
      params = params.append('searchString', searchText);
    }
    if(mealTypeParams !== '') params = params.append('mealType', mealTypeParams);
    if(mealDifficultyParam !== '') params =  params.append('mealDifficulty', mealDifficultyParam);
    return this.httpClient.get<MealFilter[]>("http://localhost:8080/meals/filters", {
      params: params
    });
  }

  createOrUpdateDiet(s: string, dto: { secondBreakfast: any; mainCourse: any; breakfast: any; snacks: any; dinner: any }) {
    return this.httpClient.post<DietDay>("http://localhost:8080/diet", dto, {
      params: {
        date: s
      }
    })
  }
  getDietSumOfIngredients(date: any){
    return this.httpClient.get<DietIngredientsSum>("http://localhost:8080/diet/ingredients", {
      params: {
        date: date
      }
    })
  }

  createImage(formData: any) {
    return this.httpClient.post("http://localhost:8080/meals/image", formData);
  }

  createMeal(value: any) {
       return this.httpClient.post("http://localhost:8080/meals", value);
  }

  getUnverifiedMeals() {
    return this.httpClient.get<UnverifiedMeal[]>("http://localhost:8080/meals/not-verified");

  }

  approveMeal(mealID: string) {
    return this.httpClient.put(`http://localhost:8080/meals/${mealID}`, {});
  }

  deleteMeal(mealID: string) {
    return this.httpClient.delete(`http://localhost:8080/meals/${mealID}`, {});
  }
}
