import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IExerciseHeader} from "../training/exercise-list/iexercise-header";

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  constructor(private http:HttpClient) {}

  getExercisesHeader(pageNumber: number){
    return this.http.get<Observable <IExerciseHeader>>("http://localhost:8080/exercises", {
      params: {
        page: pageNumber
      }
    });
  }


}
