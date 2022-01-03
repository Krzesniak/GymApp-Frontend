import {Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {InteractionService} from "../../../services/interaction.service";
import {Location} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {IngredientFilterComponent} from "./ingredient-filter/ingredient-filter.component";
import {IngredientService} from "../../../services/ingredient.service";
import {DietService} from "../../../services/diet.service";

@Component({
  selector: 'app-add-meal',
  templateUrl: './add-meal.component.html',
  styleUrls: ['./add-meal.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddMealComponent implements OnInit, OnDestroy {

  @ViewChild('selectedFile') file: ElementRef<HTMLElement> | undefined;
  addMealForm: FormGroup;
  fileRef!: File;
  url: string = "https://krzesniakowo.blob.core.windows.net/default/no_image.jpg";

  constructor(private fb: FormBuilder, private interactionService: InteractionService, private location: Location,
              private dialog: MatDialog, private ingredientService: IngredientService, private dietService: DietService) {
    this.addMealForm = this.fb.group({
      name: ['', Validators.required],
      time: ['', Validators.required],
      mealDifficulty: ['', Validators.required],
      mealType: ['', Validators.required],
      urlImage: [''],
      fat: ['', Validators.required],
      fiber: ['', Validators.required],
      carbohydrate: ['', Validators.required],
      calories: ['', Validators.required],
      protein: ['', Validators.required],
      recipeSteps: this.fb.array([], Validators.required),
      mealIngredients: this.fb.array([], Validators.required),
    });
    this.addRecipeSteps();
    this.addMealIngredients();
  }

  ngOnInit(): void {

  }

  goBack() {
    this.location.back();

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

  onSubmit() {
    if (this.addMealForm.valid) {
      const formData = new FormData();
      formData.append("file", this.fileRef);
      this.dietService.createImage(formData).subscribe((mealImage: any) => {
        this.addMealForm.patchValue({
          urlImage: mealImage.imageURL
        })
        console.log(this.addMealForm.value);
        this.dietService.createMeal(this.addMealForm.value).subscribe(data => {
          console.log(data);
        })
      }
      );
    } else {
      this.validateAllFormFields(this.addMealForm); //{7}
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

  ngOnDestroy(): void {
    this.interactionService.sendMessage('true');
  }

  addRecipeSteps() {
    const exerciseStep = this.fb.group({
      name: ['', Validators.required],
    });
    (this.addMealForm.get('recipeSteps') as FormArray).push(exerciseStep);
  }

  getRecipeSteps() {
    return (this.addMealForm.get('recipeSteps') as FormArray).controls;
  }

  removeRecipeSteps(i: number) {
    const exerciseStepsForm = (this.addMealForm.get('recipeSteps') as FormArray);
    exerciseStepsForm.removeAt(i);
  }

  addMealIngredients() {
    const mealIngredient = this.fb.group({
      name: ['', Validators.required],
      measureUnit: ['', Validators.required],
      amountOverall: [''],
      preciseAmount: ['', Validators.required],
    });
    (this.addMealForm.get('mealIngredients') as FormArray).push(mealIngredient);

  }

  getMealIngredients() {
    return (this.addMealForm.get('mealIngredients') as FormArray).controls;
  }

  removeMealIngredients(i: number) {
    const exerciseStepsForm = (this.addMealForm.get('mealIngredients') as FormArray);
    exerciseStepsForm.removeAt(i);
  }

  openFilterIngredientDialog(ingredient: AbstractControl) {
    let dialogRef = this.dialog.open(IngredientFilterComponent,
      {
        maxWidth: '100vw',
        maxHeight: '100vh',
        height: '100%',
        width: '100%'
      }/*{ disableClose: true }*/);
    dialogRef.afterClosed().subscribe(data => {
      let exerciseControlName = ingredient.get('name') as FormControl;
      if (data != 'null') {
        this.ingredientService.getIngredientDetails(data).subscribe((data) => {
          exerciseControlName.setValue(data.ingredientName);
        })
      }
    });
  }
}
