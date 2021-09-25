import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {delay} from "rxjs/operators";
import {IExerciseHeader} from "../training/exercise-list/iexercise-header";
import {IMealDetails} from "../diet/meal-details/i-meal-details";

@Injectable({
  providedIn: 'root'
})
export class DietService {

  constructor(private httpClient:HttpClient) { }
  getMealsHeaderByPage(pageNumber: number): Observable<any>{
    return this.httpClient.get("http://localhost:8080/meals", {
      params: {
        page: pageNumber
      }
    });
  }

  getMealDetailsById(id: number): Observable<IMealDetails>{
    return this.httpClient.get<IMealDetails>(`http://localhost:8080/meals/${id}`);
  }
}
