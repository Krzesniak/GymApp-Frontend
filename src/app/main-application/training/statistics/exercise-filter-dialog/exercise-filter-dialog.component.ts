import {AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {debounceTime} from "rxjs/operators";
import {ExerciseService} from "../../../../services/exercise.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {RecordExercise} from "../../record/exercise-record/exercise-record.component";

@Component({
  selector: 'app-exercise-filter-dialog',
  templateUrl: './exercise-filter-dialog.component.html',
  styleUrls: ['./exercise-filter-dialog.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ExerciseFilterDialogComponent implements OnInit {

  exerciseName: String  = 'Wyciskanie sztangi na ławce poziomej';
  exerciseVideo: String = 'https://static.fabrykasily.pl/atlas/wyciskanie_sztangi_na_lawce_plaskiej.mp4';
  exercisedFilters!: ExerciseFilter[];
  displayedColumns: string[] = ['Numer', 'Nazwa ćwiczenia', 'Poziom trudności', 'Partia mięśniowa'];
  dataSource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  form: FormGroup;
  exerciseID: String = 'ffb7185e-ceb0-42d9-8d28-c155c97b39ec';
  constructor(private fb: FormBuilder, private exerciseService: ExerciseService, private elRef: ElementRef) {
    this.form = this.fb.group({
      search:[''],
      exerciseType: [''],
      exerciseDifficulty: ['']
    })
  }

  ngOnInit(): void {
    this.form.valueChanges
      .pipe(debounceTime(500))
      .subscribe(data => {
        let searchText = this.form.get('search')?.value;
        this.exerciseService.getFilteredExercises(searchText,this.form.get('exerciseType')?.value,
          this.form.get('exerciseDifficulty')?.value).subscribe( data =>{  for(let i=0; i<data.length; i++){
            data[i].position = i+1;
          }
            this.exercisedFilters = data;
            this.dataSource =  new MatTableDataSource<ExerciseFilter>(this.exercisedFilters);
            this.dataSource.paginator = this.paginator;
          }
        );
      })

    this.exerciseService.getFilteredExercises('','','').subscribe( data =>{
      for(let i=0; i<data.length; i++){
        data[i].position = i+1;
      }
        this.exercisedFilters = data;
        this.dataSource =  new MatTableDataSource<ExerciseFilter>(this.exercisedFilters);
        this.dataSource.paginator = this.paginator;
      }
    );
  }
/*
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
*/
  selectedRowIndex: any = -1;

  getRecord(row: any) {
    this.exerciseService.getExerciseDetails(row.exerciseID).subscribe(data => {
      this.exerciseName = data.name;
      this.exerciseVideo = data.urlMovie;
      const player = this.elRef.nativeElement.querySelector('video');
      player.load();
      this.exerciseID = row.exerciseID;
      this.selectedRowIndex = row.exerciseID;
    })
  }
}

export interface ExerciseFilter {
  position: number,
  exerciseName: string,
  exerciseID: string,
  exerciseDifficulty: string,
  exerciseType: string
}
