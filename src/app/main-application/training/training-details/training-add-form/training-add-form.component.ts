import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {TrainingService} from "../../../../services/training.service";
import {ExerciseService} from "../../../../services/exercise.service";
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {debounceTime} from "rxjs/operators";
import {ExerciseFilterDialogComponent} from "../../statistics/exercise-filter-dialog/exercise-filter-dialog.component";
import {InteractionService} from "../../../../services/interaction.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-training-add-form',
  templateUrl: './training-add-form.component.html',
  styleUrls: ['./training-add-form.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class TrainingAddFormComponent implements OnInit, OnDestroy {

  addTrainingForm: FormGroup;

  constructor(private trainingService: TrainingService, private exerciseService: ExerciseService,
              private fb: FormBuilder, private dialog: MatDialog,
              private interactionService: InteractionService, private location: Location) {
    this.addTrainingForm = this.fb.group({
      name: ['', Validators.required],
      date: ['', Validators.required],
      trainingType: ['', Validators.required],
      hour: ['', Validators.required],
      note: [''],
      description: ['', Validators.required],
      duration: [''],
      exerciseResults: this.fb.array([])
    })
  }
  onSubmit() {
    this.location.back();

    this.trainingService.createTraining( this.addTrainingForm.value).subscribe(data => {
      console.log(data);
    })

  }
  addExercise() {
    const exercise = this.fb.group({
      name: ['', Validators.required],
      series: this.fb.array([])
    });
    const series = this.fb.group({
      weight: [''],
      duration: [''],
      repetitions: ['']
    });
    (exercise.get('series') as FormArray).push(series);
    (this.addTrainingForm.get('exerciseResults') as FormArray).push(exercise);
  }

  getExercises() {
    return (this.addTrainingForm.get('exerciseResults') as FormArray).controls;
  }

  addSeries(exerciseArray: AbstractControl) {
    const series = this.fb.group({
      weight: [''],
      duration: [''],
      repetitions: ['']
    })
    const exerciseArrayForm = exerciseArray.get('series') as FormArray
    exerciseArrayForm.push(series);
  }

  getSeries(exerciseArray: AbstractControl) {
    const exerciseArrayForm = exerciseArray as FormArray;
    return (exerciseArrayForm.get('series') as FormArray).controls;
  }

  removeSeries(exercise: AbstractControl, i: number) {
    const execiseArrayForm = exercise.get('series') as FormArray;
    execiseArrayForm.removeAt(i);
  }

  ngOnInit(): void {
  }

  ngOnDestroy(){
    this.interactionService.sendMessage('true');
  }


  openFilterExerciseDialog(exercise: AbstractControl) {
    let dialogRef = this.dialog.open(ExerciseFilterDialogComponent,
      {
        maxWidth: '100vw',
        maxHeight: '100vh',
        height: '100%',
        width: '100%'
      }/*{ disableClose: true }*/);
    dialogRef.afterClosed().subscribe(data => {
      let exerciseControlName = exercise.get('name') as FormControl;
      if (data != 'null') {
        this.exerciseService.getExerciseDetails(data).subscribe( (data) => {
          exerciseControlName.setValue(data.name);
        })
      }
    });
  }

  goBack() {
    this.location.back();
  }
}
