import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {TrainingService} from "../../../../services/training.service";
import {ExerciseTraining, TrainingDetails} from "../../training-details";
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ExerciseService} from "../../../../services/exercise.service";
import {IExerciseIdWithName} from "../../exercise-list/iexercise-id-with-name";
import {debounceTime} from "rxjs/operators";
import {ExerciseFilterDialogComponent} from "../../statistics/exercise-filter-dialog/exercise-filter-dialog.component";

@Component({
  selector: 'app-training-edit-form',
  templateUrl: './training-edit-form.component.html',
  styleUrls: ['./training-edit-form.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TrainingEditFormComponent implements OnInit {

  trainingDetails!: TrainingDetails;
  editTrainingForm: FormGroup;
  exercises!: IExerciseIdWithName [];
  filteredOptions: any = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private trainingService: TrainingService, private exerciseService: ExerciseService,
              private fb: FormBuilder, private dialog: MatDialog) {
    this.editTrainingForm = this.fb.group({
      name: ['', Validators.required],
      date: ['', Validators.required],
      trainingType: ['', Validators.required],
      hour: ['', Validators.required],
      note: [''],
      description: ['', Validators.required],
      exerciseResults: this.fb.array([])
    })
  }

  ngOnInit(): void {
    console.log(this.data.trainingID)
    this.trainingService.getTrainingDetails(this.data.trainingID).subscribe(training => {
      this.trainingDetails = training;
      this.editTrainingForm.patchValue({
        name: this.trainingDetails.name,
        date: this.trainingDetails.date,
        trainingType: this.trainingDetails.trainingType,
        description: this.trainingDetails.description,
        note: this.trainingDetails.note,
      })
      this.trainingDetails.exerciseResults.forEach(exercise => {
        this.initializeExercise(exercise);
      })
    })
    this.exerciseService.getAllExercises().subscribe(exercise => {
      this.exercises = exercise;
    });
  }

  filterData(enteredData: any) {
    console.log("Filtered data")
    console.log(enteredData);
    this.filteredOptions = this.exercises.filter(item => {
      return item.name.toLowerCase().indexOf(enteredData.toLowerCase()) > -1
    })
  }

  onSubmit() {
    console.log(this.editTrainingForm);
    this.trainingService.updateTraining(this.data.trainingID, this.editTrainingForm.value).subscribe(data => {
      console.log(data);
    })

  }

  addExercise() {
    const exercise = this.fb.group({
      name: ['', Validators.required],
      series: this.fb.array([])
    });
    exercise.valueChanges
      .pipe(debounceTime(200))
      .subscribe(response => {
        console.log('entered data is ', response);
        if (response) {
          this.filterData(response.name);
        } else {
          this.filteredOptions = [];
        }

      });
    const series = this.fb.group({
      weight: [''],
      duration: [''],
      repetitions: ['']
    });
    (exercise.get('series') as FormArray).push(series);
    (this.editTrainingForm.get('exerciseResults') as FormArray).push(exercise);
  }
  initializeExercise(exerciseParam: ExerciseTraining) {
    const exercise = this.fb.group({
      name: [exerciseParam.name, Validators.required],
      series: this.fb.array([])
    });
    exerciseParam.results.forEach(result => {
      const series = this.fb.group({
        weight: [result.weight],
        duration: [result.duration],
        repetitions: [result.repetitions]
      });
      (exercise.get('series') as FormArray).push(series);
    });
    (this.editTrainingForm.get('exerciseResults') as FormArray).push(exercise);
  }

  getExercises() {
    return (this.editTrainingForm.get('exerciseResults') as FormArray).controls;
  }

  addSeries(exerciseArray: AbstractControl) {
    const series = this.fb.group({
      weight: [''],
      duration: [''],
      repetitions: ['']
    })
    const exerciseArrayForm = exerciseArray.get('series') as FormArray
    exerciseArrayForm.push(series);
    console.log(this.fb)
  }

  getSeries(exerciseArray: AbstractControl) {
    const exerciseArrayForm = exerciseArray as FormArray;
    return (exerciseArrayForm.get('series') as FormArray).controls;
  }

  removeSeries(exercise: AbstractControl, i: number) {
    const execiseArrayForm = exercise.get('series') as FormArray;
    execiseArrayForm.removeAt(i);
  }
  openFilterExerciseDialog() {
    let dialogRef = this.dialog.open(ExerciseFilterDialogComponent,
      {
        maxWidth: '100vw',
        maxHeight: '100vh',
        height: '100%',
        width: '100%'
      }/*{ disableClose: true }*/);
  }
}
