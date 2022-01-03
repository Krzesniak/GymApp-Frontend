import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  QueryList,
  ViewChildren, ViewEncapsulation
} from '@angular/core';
import {NgxSpinnerService} from "ngx-spinner";
import {Subscription} from "rxjs";
import {DietService} from "../../../services/diet.service";
import {MatDialog} from "@angular/material/dialog";
import {MealHeader} from "./meal-header";
import {Router} from "@angular/router";
import {InteractionService} from "../../../services/interaction.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {debounceTime} from "rxjs/operators";

@Component({
  selector: 'app-diet-list',
  templateUrl: './diet-list.component.html',
  styleUrls: ['./diet-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DietListComponent implements OnInit, AfterViewInit {

  @Output() closeSideBar: EventEmitter<any> = new EventEmitter();
  @ViewChildren('theLastList', { read: ElementRef })
  theLastList!: QueryList<ElementRef>

  alSub!: Subscription;

  meals: any = [];
  totalPages!: number;
  currentPage = 0;
  observer: any;
  form: FormGroup;

  constructor(
    private mealService: DietService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private interactionService: InteractionService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      search:[''],
      mealType: [''],
      mealDifficulty: ['']
    })
  }

  ngOnInit() {
    this.form.valueChanges
      .pipe(debounceTime(500))
      .subscribe(data => {
        this.meals = [];
        this.currentPage = 0;
        this.getMeals();
      })
    this.getMeals();
    this.intersectionObserver();
  }

  ngAfterViewInit() {
    this.theLastList.changes.subscribe((d) => {
      console.log(d);
      if (d.last) { this.observer.observe(d.last.nativeElement); }
    });
  }

  getMeals() {

    this.spinner.show();
    this.alSub = this.mealService.getMealsHeaderByPage(this.currentPage, this.form.get('search')?.value,
      this.form.get('mealType')?.value, this.form.get('mealDifficulty')?.value).subscribe((d) => {
      this.spinner.hide();
      this.totalPages = d.totalPages;
      // @ts-ignore
      d.meals.forEach((element) => {
        this.meals.push(element);
      });
    });
  }

  intersectionObserver() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    this.observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        if (this.currentPage < this.totalPages) {
          this.currentPage++;
          this.getMeals();
        }
      }
    }, options);
  }

  openDialog(meal: MealHeader) {
    this.interactionService.sendMessage("false");
    this.router.navigate(['app/meals', meal.id]);
//     this.dialog.open(MealDetailsComponent, {data: {mealID: meal.id}});
  }

  addMeal() {
    this.interactionService.sendMessage("false");
    this.router.navigate(['app/meals/create']);

  }
}


