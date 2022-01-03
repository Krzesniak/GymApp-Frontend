import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IngredientFilter} from "../main-application/diet/add-meal/ingredient-filter/ingredient-filter.component";
import {Measurement} from "../auth/registration/registration.component";

@Injectable({
  providedIn: 'root'
})
export class MeasurementService {

  constructor(private http:HttpClient) { }

  getMeasurements(){
    return this.http.get<Measurement[]>(`http://localhost:8080/measurements`);
  }
}
