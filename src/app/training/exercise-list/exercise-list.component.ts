import { Component, OnInit } from '@angular/core';
import {ExerciseService} from "../../services/exercise.service";
import {IExerciseHeader} from "./iexercise-header";

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.css']
})
export class ExerciseListComponent implements OnInit {

  exercisesHeader: any;
  constructor(private exerciseService: ExerciseService) { }

  ngOnInit(): void {
    this.exerciseService.getExercisesHeader().subscribe( data => {
      this.exercisesHeader = data;
      console.log(this.exercisesHeader);
    })
  }

}
