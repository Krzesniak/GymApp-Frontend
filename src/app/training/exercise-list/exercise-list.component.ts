import {Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {ExerciseService} from "../../services/exercise.service";
import {IExerciseHeader} from "./iexercise-header";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.css']
})
export class ExerciseListComponent implements OnInit {

  @ViewChildren('theLastList', { read: ElementRef })
  theLastList!: QueryList<ElementRef>

  exercisesHeader: any;
  numberPage: number = 0;
  scrollMore: boolean = true;
  constructor(private exerciseService: ExerciseService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.exerciseService.getExercisesHeader(this.numberPage).subscribe( data => {
      this.exercisesHeader = data;
      console.log(this.exercisesHeader);
    })
  }
  onScroll() {
    console.log("XD");
    if (this.scrollMore) {
      this.spinner.show();
      this.scrollMore = false;
      this.numberPage += 1;
      console.log("scrool")
      this.loadMore();
    }
  }
// load th next 6 posts
  loadMore() {
    this.exerciseService.getExercisesHeader(this.numberPage).subscribe( (data: any) => {
      this.spinner.hide();
      if(data.length != 0) this.scrollMore = true;
      this.exercisesHeader.concat(data);
      console.log(this.exercisesHeader);
    })
  }

}
