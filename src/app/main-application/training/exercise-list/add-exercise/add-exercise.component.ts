import {Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {InteractionService} from "../../../../services/interaction.service";
import {Location} from "@angular/common";
import {ExerciseService} from "../../../../services/exercise.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-exercise',
  templateUrl: './add-exercise.component.html',
  styleUrls: ['./add-exercise.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddExerciseComponent implements OnInit, OnDestroy {

  @ViewChild('selectedFile') file: ElementRef<HTMLElement> | undefined;
  @ViewChild('selectedMovie') movie: ElementRef<HTMLElement> | undefined;

  addExerciseForm: FormGroup;
  fileRef!: File;
  movieRef!: File;
  url: string = "https://krzesniakowo.blob.core.windows.net/default/no_image.jpg";
  urlMovie: any;
  constructor(private fb: FormBuilder, private interactionService: InteractionService, private location: Location,
              private exerciseService: ExerciseService, private router: Router) {
    this.addExerciseForm = this.fb.group({
      name: ['', Validators.required],
      urlMovie: [''],
      urlImage: [''],
      exerciseDifficulty: ['', Validators.required],
      exerciseType: ['', Validators.required],
      hints: this.fb.array([], Validators.required),
      steps: this.fb.array([], Validators.required),
    });
    this.addExerciseStep();
    this.addExerciseHint();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.interactionService.sendMessage('true');
  }

  goBack() {
    this.location.back();
  }

  onSubmit() {
    console.log(this.addExerciseForm)
    if (this.addExerciseForm.valid) {
      const formData = new FormData();
      formData.append("image", this.fileRef);
      formData.append("movie", this.movieRef);
      this.exerciseService.createImageAndMovie(formData).subscribe((imageAndVideo: any) => {
          this.addExerciseForm.patchValue({
            urlImage: imageAndVideo.urlImage,
            urlMovie: imageAndVideo.urlMovie
          })
          this.exerciseService.createExercise(this.addExerciseForm.value).subscribe(data => {
            this.router.navigate(["/app/exercises"], {queryParams: { added: 'true' } })
          })
        }
      );
    } else {
      this.validateAllFormFields(this.addExerciseForm); //{7}
    }

  }

  addExerciseStep() {
    const exerciseStep = this.fb.group({
      name: ['', Validators.required],
    });
    (this.addExerciseForm.get('steps') as FormArray).push(exerciseStep);
  }

  getExerciseSteps() {
    return (this.addExerciseForm.get('steps') as FormArray).controls;
  }

  removeExercise( i: number) {
    const exerciseStepsForm = (this.addExerciseForm.get('steps') as FormArray);
    exerciseStepsForm.removeAt(i);
  }

  getExerciseHints() {
    return (this.addExerciseForm.get('hints') as FormArray).controls;

  }

  addExerciseHint() {
    const exerciseHint = this.fb.group({
      name: ['', Validators.required],
    });
    (this.addExerciseForm.get('hints') as FormArray).push(exerciseHint);
  }

  removeHint(i: number) {

  }

  changeExerciseImage($event: Event) {
    // @ts-ignore
    this.fileRef = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(this.fileRef);
    reader.onload = (anotherEvent: any) => {
      this.url = anotherEvent.target.result;
    }
  }

  getInput() {
    this.file?.nativeElement.click();
  }
  getMovie(){
    this.movie?.nativeElement.click();
  }


  changeExerciseMovie($event: Event) {
    // @ts-ignore
    this.movieRef = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(this.movieRef);
    reader.onload = (anotherEvent: any) => {
      this.urlMovie = anotherEvent.target.result;
    }

  }
  validateAllFormFields(formGroup: FormGroup) {         //{1}
    Object.keys(formGroup.controls).forEach(field => {  //{2}
      const control = formGroup.get(field);             //{3}
      if (control instanceof FormControl) {             //{4}
        control.markAsTouched({onlySelf: true});
      } else if (control instanceof FormGroup) {        //{5}
        this.validateAllFormFields(control);            //{6}
      }
      if (control instanceof FormArray) {
        control.controls.forEach(data => {
          this.validateAllFormFields(data as FormGroup);
        })
      }
    });
  }

}
