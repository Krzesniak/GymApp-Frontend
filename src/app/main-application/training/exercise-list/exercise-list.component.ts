import {AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren, ViewEncapsulation} from '@angular/core';
import {ExerciseService} from "../../../services/exercise.service";
import {NgxSpinnerService} from "ngx-spinner";
import {ActivatedRoute, Router} from "@angular/router";
import {InteractionService} from "../../../services/interaction.service";
import {Subscription} from "rxjs";
import {FormBuilder, FormGroup} from "@angular/forms";
import {debounceTime} from "rxjs/operators";

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ExerciseListComponent implements OnInit, AfterViewInit {

  alSub!: Subscription;
  infoMessage: string = '';
  @ViewChildren('theLastList', {read: ElementRef})
  theLastList!: QueryList<ElementRef>
  currentPage = 0;
  totalPages!: number;
  exercises: any = [];

  observer: any;

  constructor(private exerciseService: ExerciseService, private spinner: NgxSpinnerService,
              private router: Router, private interactionService: InteractionService,
              private fb: FormBuilder, private activatedRouter: ActivatedRoute) {
    this.form = this.fb.group({
      search: [''],
      exerciseType: [''],
      exerciseDifficulty: ['']
    })
  }

  ngOnInit(): void {
    this.activatedRouter.queryParams
      .subscribe(params => {
        if(params.added !== undefined && params.added === 'true') {
          this.infoMessage = 'Pomyślnie dodano ćwiczenie. Oczekiwanie na akceptację przez administratora';
          setTimeout(() => {
            this.infoMessage = '';
          }, 5000);
        }});
    this.getExercises();
    this.intersectionObserver();
    this.form.valueChanges
      .pipe(debounceTime(500))
      .subscribe(data => {
        this.exercises = [];
        this.currentPage = 0;
        this.getExercises();
      })
  }

  ngAfterViewInit() {
    this.theLastList.changes.subscribe((d) => {
      console.log(this.currentPage);
      if (d.last) {
        this.observer.observe(d.last.nativeElement);
      }
    });
  }

// load th next 6 posts
  form: FormGroup;

  getExercises() {
    this.spinner.show();
    this.alSub = this.exerciseService.getExercisesHeader(this.currentPage, this.form.get('search')?.value,
      this.form.get('exerciseType')?.value, this.form.get('exerciseDifficulty')?.value).subscribe((data: any) => {
      this.spinner.hide();
      console.log(data);
      this.totalPages = data.totalPages;
      data.exercises.forEach((element: any) => {
        this.exercises.push(element);
      });
    })
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
          this.getExercises();
        }
      }
    }, options);
  }


  exerciseDetails(exercise: any) {
    this.interactionService.sendMessage("false");
    this.router.navigate(['app/exercises', exercise.id]);
  }

  addExercise() {
    this.interactionService.sendMessage("false");
    this.router.navigate(['app/exercises/create']);

  }
}
