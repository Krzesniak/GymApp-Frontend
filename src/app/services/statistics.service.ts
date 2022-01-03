import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TrainingDetails} from "../main-application/training/training-details";
import {ExerciseDetails} from "../main-application/training/exercise-list/exercise-details/exercise-details.component";
import {Point, ProgressChart, TrainingsDone} from "../main-application/training/statistics/statistics.component";
import {MeasurementProgress} from "../main-application/diet/diet-statistics/diet-statistics.component";
import {SummaryDto} from "../modules/dashboard/dashboard.component";

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(private httpClient: HttpClient) {
  }

  getNumberOfTrainingInYear(dateParam: any) {
    dateParam += 'T01:30:00.000-05:00';
    return this.httpClient.get<number[]>(`http://localhost:8080/exercise/statistics/trainings-number`, {
      params:{
        date: dateParam
      }
    });
  }
  getNumberOfTrainingType(dateParam: any) {
    dateParam += 'T01:30:00.000-05:00';
    return this.httpClient.get<number[]>(`http://localhost:8080/exercise/statistics/exercise-types`, {
      params:{
        date: dateParam
      }
    });
  }
  getExerciseProgress(id: string){
    return this.httpClient.get<ProgressChart>(`http://localhost:8080/exercise/statistics/${id}`);
  }
  getDietMeasurementProgress(property: string){
    return this.httpClient.get<MeasurementProgress>(`http://localhost:8080/diets/statistics/measurement`, {
      params: {
        measurement: property
      }
    })
  }


  getDietNutrientProgress(nutrient: string, date: string) {
    return this.httpClient.get<MeasurementProgress>(`http://localhost:8080/diets/statistics/nutrients`, {
      params: {
        date: date,
        nutrient: nutrient
      }
    })
  }
  getSummary(date: any){
    return this.httpClient.get<SummaryDto>('http://localhost:8080/summary',{
      params:{
        date: date
      }
    });
  }

  getHeaderTraining(headerDate: any) {
    return this.httpClient.get<TrainingsDone>('http://localhost:8080/exercise/statistics/done',{
      params:{
        date: headerDate
      }
    });

  }
}
