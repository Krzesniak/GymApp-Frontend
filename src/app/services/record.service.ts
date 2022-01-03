import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {IExerciseHeader} from "../main-application/training/exercise-list/iexercise-header";
import {HttpClient} from "@angular/common/http";
import {
  ExerciseHeader,
  RecordExercise
} from "../main-application/training/record/exercise-record/exercise-record.component";

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  baseUrl: String = "http://localhost:8080/records/";

  constructor(private http: HttpClient) { }

  getExercisesRecord(sortBy: any){
    return this.http.get<RecordExercise[]>(this.baseUrl +"exercises", {
      params: {
        sort: sortBy
      }
    });
  }

  getExercisesHeader(chosenDate: string) {
    return this.http.get<ExerciseHeader>(this.baseUrl +"exercises/monthly", {
      params: {
        date: chosenDate
      }
    });
  }
}
