import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {TrainingDetails} from "../main-application/training/training-details";
import {Training} from "../main-application/training/training-overview/training-overview.component";

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  constructor(private httpClient:HttpClient) { }

  getTrainingDetails(id: number): Observable<TrainingDetails>{
    return this.httpClient.get<TrainingDetails>(`http://localhost:8080/trainings/${id}`);
  }

  updateTraining(trainingID: string, editTrainingForm: any) {
    return this.httpClient.put(`http://localhost:8080/trainings/${trainingID}`, editTrainingForm);
  }
  getAllTrainings() {
    return this.httpClient.get<Training[]>(`http://localhost:8080/trainings`);
  }

  createTraining(trainingForm: any) {
    return this.httpClient.post(`http://localhost:8080/trainings`, trainingForm);
  }
}
