import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {InteractionService} from "../../../../services/interaction.service";
import {ExerciseService} from "../../../../services/exercise.service";

@Component({
  selector: 'app-exercise-details',
  templateUrl: './exercise-details.component.html',
  styleUrls: ['./exercise-details.component.css']
})
export class ExerciseDetailsComponent implements OnInit, OnDestroy{

  exerciseDetails: ExerciseDetails = {exerciseDifficulty: "", exerciseType: "", hints: [], steps: [], name: "", urlMovie: "", urlImage: ""}
  idRoute: string = ''
  constructor(private route: ActivatedRoute, private location: Location,
              private interactionService: InteractionService, private exerciseService: ExerciseService) { }

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    this.idRoute = id;
    this.exerciseService.getExerciseDetails(id).subscribe(data => {
      this.exerciseDetails = data;
    })
  }
  ngOnDestroy(){
    this.interactionService.sendMessage("true");
  }
  goBack() {
    this.location.back();
  }

}
export interface ExerciseDetails {
  name: string,
  urlImage: string,
  urlMovie: string,
  exerciseType: string,
  exerciseDifficulty: string,
  hints: string[],
  steps: string[]
}
