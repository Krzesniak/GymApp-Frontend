import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {IMealDetails} from "../meal-details/i-meal-details";
import {DietService} from "../../../services/diet.service";
import {MatDialog} from "@angular/material/dialog";
import {DietFiltersComponent} from "../diet-filters/diet-filters.component";

@Component({
  selector: 'app-diet-plan',
  templateUrl: './diet-plan.component.html',
  styleUrls: ['./diet-plan.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class DietPlanComponent implements OnInit {
  ingredients: DietIngredientsSum = {calories : 0, carbohydrate : 0, fat : 0, fiber : 0, protein : 0 }
  breakfast: any;
  currentDay : Date = new Date();
  currentDayText : any;
  dinner: any;
  mainCourse: any;
  secondBreakfast: any;
  snacks: any;
  constructor(private dietService: DietService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    let options = {
      weekday: "long",
      year: "numeric",
      month: "2-digit",
      day: "numeric"
    };
    // @ts-ignore
    this.currentDayText = this.currentDay.toLocaleDateString("pl", options);
    this.getDiet(this.formatDate());
    this.getSumOfIngredients(this.formatDate());
  }
  formatDate(){
     return  this.currentDay.getFullYear().toString() + '-' +
      (this.currentDay.getMonth() + 1).toString().padStart(2, '0')
      + '-' + this.currentDay.getDate().toString().padStart(2, '0')
  }
  getDiet(date: any){
    this.dietService.getDietDetailsByDate(date).subscribe(data => {
      this.breakfast = data.breakfast;
      this.secondBreakfast = data.secondBreakfast;
      this.dinner = data.dinner
      this.mainCourse = data.mainCourse;
      this.snacks = data.snacks;
    }, error => {
      this.breakfast = null;
      this.secondBreakfast = null;
      this.dinner = null;
      this.mainCourse = null;
      this.snacks = null;
    })
  }
  getSumOfIngredients(date: any){
    this.dietService.getDietSumOfIngredients(date).subscribe(data => {
      this.ingredients = data;
    })
  }

  subtractDay() {
    this.currentDay.setDate(this.currentDay.getDate() - 1);
    let options = {
      weekday: "long",
      year: "numeric",
      month: "2-digit",
      day: "numeric"
    };
    // @ts-ignore
    this.currentDayText = this.currentDay.toLocaleDateString("pl", options);
    this.getDiet(this.formatDate());
    this.getSumOfIngredients(this.formatDate());


  }

  addDay() {this.currentDay.setDate(this.currentDay.getDate() + 1);
    let options = {
      weekday: "long",
      year: "numeric",
      month: "2-digit",
      day: "numeric"
    };
    console.log(this.formatDate());
    // @ts-ignore
    this.currentDayText = this.currentDay.toLocaleDateString("pl", options);
    this.getDiet(this.formatDate());
    this.getSumOfIngredients(this.formatDate());


  }

  addSnack() {
    let dialogRef =  this.dialog.open(DietFiltersComponent,
      {
        maxWidth: '100vw',
        maxHeight: '100vh',
        height: '100%',
        width: '100%'
      }/*{ disableClose: true }*/);
    dialogRef.afterClosed().subscribe(data => {
      if(data != 'null') {
        let dto = {
          breakfast: this.breakfast?.id, secondBreakfast: this.secondBreakfast?.id,
          mainCourse: this.mainCourse?.id, dinner: this.dinner?.id, snacks: data
        }
        this.addMeal(dto);

      }
    })
  }

  addDinner() {
    let dialogRef =  this.dialog.open(DietFiltersComponent,
      {
        maxWidth: '100vw',
        maxHeight: '100vh',
        height: '100%',
        width: '100%'
      }/*{ disableClose: true }*/);
    dialogRef.afterClosed().subscribe(data => {
      if(data != 'null') {
        let dto = {
          breakfast: this.breakfast?.id, secondBreakfast: this.secondBreakfast?.id,
          mainCourse: this.mainCourse?.id, dinner: data, snacks: this.snacks?.id
        }
        this.addMeal(dto);

      }
    })

  }

  addMainCourse() {
    let dialogRef =  this.dialog.open(DietFiltersComponent,
      {
        maxWidth: '100vw',
        maxHeight: '100vh',
        height: '100%',
        width: '100%'
      }/*{ disableClose: true }*/);
    dialogRef.afterClosed().subscribe(data => {
      if(data != 'null') {
        let dto = {
          breakfast: this.breakfast?.id, secondBreakfast: this.secondBreakfast?.id,
          mainCourse: data, dinner: this.dinner?.id, snacks: this.snacks?.id
        }
        this.addMeal(dto);

      }
    })
  }

  addSecondBreakfast() {
    let dialogRef =  this.dialog.open(DietFiltersComponent,
      {
        maxWidth: '100vw',
        maxHeight: '100vh',
        height: '100%',
        width: '100%'
      }/*{ disableClose: true }*/);
    dialogRef.afterClosed().subscribe(data => {
      if(data != 'null') {
        let dto = {
          breakfast: this.breakfast?.id, secondBreakfast: data,
          mainCourse: this.mainCourse?.id, dinner: this.dinner?.id, snacks: this.snacks?.id
        }
        this.addMeal(dto);

      }
    })
  }

  addBreakfast() {
    let dialogRef =  this.dialog.open(DietFiltersComponent,
      {
        maxWidth: '100vw',
        maxHeight: '100vh',
        height: '100%',
        width: '100%'
      }/*{ disableClose: true }*/);
    dialogRef.afterClosed().subscribe(data => {
      if(data != 'null') {
        let dto = {
          breakfast: data, secondBreakfast: this.secondBreakfast?.id,
          mainCourse: this.mainCourse?.id, dinner: this.dinner?.id, snacks: this.snacks?.id
        }
        this.addMeal(dto);

      }
    })
  }

  addMeal(dto: any){
      this.dietService.createOrUpdateDiet(this.formatDate(), dto).subscribe(data => {
        this.breakfast = data.breakfast;
        this.secondBreakfast = data.secondBreakfast;
        this.dinner = data.dinner
        this.mainCourse = data.mainCourse;
        this.snacks = data.snacks;
        this.getSumOfIngredients(this.formatDate());
      })
  }

  removeMainCourse() {
    this.mainCourse = null;
    let dto = {
      breakfast: this.breakfast?.id, secondBreakfast: this.secondBreakfast?.id,
      mainCourse: this.mainCourse?.id, dinner: this.dinner?.id, snacks: this.snacks?.id
    }
    this.addMeal(dto);
  }
  removeSecondBreakfast() {
    this.secondBreakfast = null;
    let dto = {
      breakfast: this.breakfast?.id, secondBreakfast: this.secondBreakfast?.id,
      mainCourse: this.mainCourse?.id, dinner: this.dinner?.id, snacks: this.snacks?.id
    }
    this.addMeal(dto);
  }
  removeBreakfast(){
      this.breakfast = null;
      let dto = {
        breakfast: this.breakfast?.id, secondBreakfast: this.secondBreakfast?.id,
        mainCourse: this.mainCourse?.id, dinner: this.dinner?.id, snacks: this.snacks?.id
      }
      this.addMeal(dto);
  }

  removeDinner() {
    this.dinner = null;
    let dto = {
      breakfast: this.breakfast?.id, secondBreakfast: this.secondBreakfast?.id,
      mainCourse: this.mainCourse?.id, dinner: this.dinner?.id, snacks: this.snacks?.id
    }
    this.addMeal(dto);
  }
  removeSnacks() {
    this.snacks = null;
    let dto = {
      breakfast: this.breakfast?.id, secondBreakfast: this.secondBreakfast?.id,
      mainCourse: this.mainCourse?.id, dinner: this.dinner?.id, snacks: this.snacks?.id
    }
    this.addMeal(dto);
  }
}
export interface DietDay{
  breakfast: IMealDetails,
  secondBreakfast: IMealDetails,
  mainCourse: IMealDetails,
  dinner: IMealDetails,
  snacks: IMealDetails
}
export interface DietIngredientsSum {
  calories: number,
  protein: number,
  carbohydrate: number,
  fat: number,
  fiber: number,

}


