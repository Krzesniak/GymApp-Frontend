import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {IExerciseHeader} from "../main-application/training/exercise-list/iexercise-header";
import {IExerciseIdWithName} from "../main-application/training/exercise-list/iexercise-id-with-name";
import {TrainingDetails} from "../main-application/training/training-details";
import {ExerciseDetails} from "../main-application/training/exercise-list/exercise-details/exercise-details.component";
import {ExerciseFilter} from "../main-application/training/statistics/exercise-filter-dialog/exercise-filter-dialog.component";
import {UnverifiedExercise} from "../main-application/user/admin-panel/admin-panel.component";

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  constructor(private http:HttpClient) {}

  getExercisesHeader(pageNumber: number, searchStringP: any, exerciseTypeP: any, exerciseDifficultyP: any){
    let params = new HttpParams();
    if(searchStringP !== '' ){
      params = params.append('searchString', searchStringP);
    }
    if(exerciseTypeP !== '') params = params.append('exerciseType', exerciseTypeP);
    if(exerciseDifficultyP !== '') params =  params.append('exerciseDifficulty', exerciseDifficultyP);
    params = params.append('pageNumber', pageNumber)
    return this.http.get<Observable <IExerciseHeader>>("http://localhost:8080/exercises", {
      params: params
    });
  }
  getExerciseDetails(id: string){
    return this.http.get<ExerciseDetails>(`http://localhost:8080/exercises/${id}`);
  }

  getAllExercises() {
    return this.http.get<IExerciseIdWithName[]>("http://localhost:8080/exercises/all");
  }

  getFilteredExercises(searchStringP: any, exerciseTypeP: any, exerciseDifficultyP: any) {
    let params = new HttpParams();
    if(searchStringP !== '' ){
      params = params.append('searchString', searchStringP);
    }
    if(exerciseTypeP !== '') params = params.append('exerciseType', exerciseTypeP);
    if(exerciseDifficultyP !== '') params =  params.append('exerciseDifficulty', exerciseDifficultyP);
    return this.http.get<ExerciseFilter[]>("http://localhost:8080/exercises/filters", {
      params: params
    });
  }

  createImageAndMovie(formData: FormData) {
    return this.http.post("http://localhost:8080/exercises/files", formData);
  }

  createExercise(value: any) {
    return this.http.post("http://localhost:8080/exercises/", value);
  }

  getUnverifiedExercises() {
    return this.http.get<UnverifiedExercise[]>("http://localhost:8080/exercises/not-verified");
  }

  approveExercise(exerciseID: string) {
    return this.http.put(`http://localhost:8080/exercises/${exerciseID}`, {});
  }

  deleteExercise(exerciseID: string) {
    return this.http.delete(`http://localhost:8080/exercises/${exerciseID}`, {});
  }
}
