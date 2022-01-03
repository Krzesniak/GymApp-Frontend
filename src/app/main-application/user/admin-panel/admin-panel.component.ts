import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ExerciseService} from "../../../services/exercise.service";
import {InteractionService} from "../../../services/interaction.service";
import {Router} from "@angular/router";
import {DietService} from "../../../services/diet.service";

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdminPanelComponent implements OnInit {

  exercises: UnverifiedExercise[] = [];
  meals: UnverifiedMeal[] = [];

  constructor(private exerciseService: ExerciseService, private interactionService: InteractionService,
              private router: Router, private mealService: DietService) {
  }

  ngOnInit(): void {
    this.exerciseService.getUnverifiedExercises().subscribe(data => {
      this.exercises = data
    })
    this.mealService.getUnverifiedMeals().subscribe(data => {
      this.meals = data
    })
  }

  approveExercise(exercise: UnverifiedExercise) {
    this.exerciseService.approveExercise(exercise.exerciseID).subscribe(data => {
      this.exerciseService.getUnverifiedExercises().subscribe(data => {
        this.exercises = data
      })
    });
  }

  deleteExercise(exercise: UnverifiedExercise) {
    this.exerciseService.deleteExercise(exercise.exerciseID).subscribe(data => {
      this.exerciseService.getUnverifiedExercises().subscribe(data => {
        this.exercises = data
      })
    });

  }

  exerciseDetails(exercise: UnverifiedExercise) {
      this.interactionService.sendMessage("false");
      this.router.navigate(['app/exercises', exercise.exerciseID]);

  }

  deleteMeal(meal: UnverifiedMeal) {
    this.mealService.deleteMeal(meal.mealID).subscribe(data => {
      this.mealService.getUnverifiedMeals().subscribe(data => {
        this.meals = data
      })
    })
  }

  approveMeal(meal: UnverifiedMeal) {
    this.mealService.approveMeal(meal.mealID).subscribe(data => {
      this.mealService.getUnverifiedMeals().subscribe(data => {
        this.meals = data
      })
    });
  }

  mealDetails(meal: UnverifiedMeal) {
    this.interactionService.sendMessage("false");
    this.router.navigate(['app/meals', meal.mealID]);
  }
}

export interface UnverifiedExercise {
  exerciseID: string,
  urlImage: string,
  createdDate: Date,
  createdBy: string,
  name: string
}
export interface UnverifiedMeal {
  mealID: string,
  urlImage: string,
  createdDate: Date,
  createdBy: string,
  name: string
}
