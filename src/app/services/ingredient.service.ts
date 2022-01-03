import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {ExerciseFilter} from "../main-application/training/statistics/exercise-filter-dialog/exercise-filter-dialog.component";
import {IngredientFilter} from "../main-application/diet/add-meal/ingredient-filter/ingredient-filter.component";
import {ExerciseDetails} from "../main-application/training/exercise-list/exercise-details/exercise-details.component";

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  constructor(private http:HttpClient) { }

  getFilteredIngredients(searchStringP: string) {
    let params = new HttpParams();
    if(searchStringP !== '' ){
      params = params.append('searchString', searchStringP);
    }

    return this.http.get<IngredientFilter[]>("http://localhost:8080/ingredients/filters", {
      params: params
    });
  }

  getIngredientDetails(id: any) {
    return this.http.get<IngredientFilter>(`http://localhost:8080/ingredients/${id}`);
  }
}
