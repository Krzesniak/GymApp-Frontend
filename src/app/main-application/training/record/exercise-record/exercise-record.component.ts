import {AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {RecordService} from "../../../../services/record.service";
import {Router} from "@angular/router";
import {InteractionService} from "../../../../services/interaction.service";

@Component({
  selector: 'app-exercise-record',
  templateUrl: './exercise-record.component.html',
  styleUrls: ['./exercise-record.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ExerciseRecordComponent implements OnInit, AfterViewInit {
  selectedVal!: string;
  exerciseRecord!: RecordExercise[];
  exerciseHeader!: ExerciseHeader;
  constructor(private recordService: RecordService, private interactionService: InteractionService,
              private router: Router) {
  }

  ngOnInit(): void {
    let date = this.chosenYear + '-' + (this.chosenMonth + 1).toString().padStart(2, '0') + '-01';
    this.recordService.getExercisesHeader(date).subscribe(data => {
      this.exerciseHeader = data;
    })
    this.recordService.getExercisesRecord(null).subscribe(data =>{
      this.exerciseRecord = data;
      this.dataSource =  new MatTableDataSource<RecordExercise>(this.exerciseRecord);
      this.dataSource.paginator = this.paginator;
      console.log(this.exerciseRecord);
      }
    );
    this.maxByProperty = 'weight';


  }

  displayedColumns: string[] = ['Numer', 'Nazwa ćwiczenia', 'Ciężar', 'Ilość powtórzeń', 'Czas trwania', 'Nazwa Treningu'];
  months = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec',
    'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];
  dataSource: any;
  chosenMonth= new Date().getMonth();
  chosenYear = new Date().getFullYear();
  currentDate = this.months[this.chosenMonth] + ', ' + this.chosenYear.toString();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  maxByProperty?: string;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  goToTraining(trainingID: any) {
    this.interactionService.sendMessage('false');
    this.router.navigate(['app/trainings', trainingID]);
  }

  addMonth() {
    if(this.chosenMonth == 11){
      this.chosenYear += 1;
      this.chosenMonth = 0;
    }else {
      this.chosenMonth++;
    }
    this.currentDate = this.months[this.chosenMonth] + ', ' + this.chosenYear.toString();
    let date = this.chosenYear + '-' + (this.chosenMonth + 1).toString().padStart(2, '0') + '-01';
    this.recordService.getExercisesHeader(date).subscribe(data => {
      this.exerciseHeader = data;
    })
  }
  subtractMonth(){
    if(this.chosenMonth == 0){
      this.chosenMonth = 11;
      this.chosenYear--;
    }
    else{
      this.chosenMonth--;
    }
    this.currentDate = this.months[this.chosenMonth] + ', ' + this.chosenYear.toString();
    let date = this.chosenYear + '-' + (this.chosenMonth + 1).toString().padStart(2, '0') + '-01';
    this.recordService.getExercisesHeader(date).subscribe(data => {
      this.exerciseHeader = data;
    })

  }

  sort() {
    this.recordService.getExercisesRecord(this.maxByProperty).subscribe(data =>{
        this.exerciseRecord = data;
        this.dataSource =  new MatTableDataSource<RecordExercise>(this.exerciseRecord);
        this.dataSource.paginator = this.paginator;
        console.log(this.exerciseRecord);
      }
    );
  }
}
export interface RecordExercise {
  position: number,
  weight: number
  duration: Date
  repetitions: number,
  trainingID: string
  trainingName: string
}
export interface ExerciseHeaderValue{
  trainingID: string,
  value: any
}
export interface ExerciseHeader{
  exerciseName: ExerciseHeaderValue,
  exercisesCounter: ExerciseHeaderValue,
  longestTrainingTime: ExerciseHeaderValue,
  seriesCounter: ExerciseHeaderValue
}


