import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {FormBuilder, FormGroup} from "@angular/forms";
import {DietService} from "../../../services/diet.service";
import {debounceTime} from "rxjs/operators";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-diet-filters',
  templateUrl: './diet-filters.component.html',
  styleUrls: ['./diet-filters.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DietFiltersComponent implements OnInit {

  displayedColumns: string[] = ['Numer', 'Nazwa posiłku', 'Poziom trudności', 'Typ posiłku']; //TODO ADD TIME
  mealFilters: any = [];
  dataSource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  form: FormGroup;
  selectedRowIndex: any = -1;
  mealName: string = 'Burrito z kurczakiem';
  mealID: string = 'd3c36a39-f066-4b12-adaf-5cdd530492cf';
  mealImage: string = 'https://krzesniakowo.blob.core.windows.net/food/amarantus_gotowany.jpg'

  constructor(private fb: FormBuilder, private dietService: DietService){
    this.form = this.fb.group({
      search:[''],
      mealType: [''],
      mealDifficulty: ['']
    })
  }

  getRecord(row: any) {
    this.dietService.getMealDetailsById(row.id).subscribe(data => {
      this.mealName = data.name;
      this.mealID = row.id;
      this.selectedRowIndex = row.exerciseID;
      this.mealImage = data.urlImage;
    })
  }

  ngOnInit(): void {
    this.form.valueChanges
      .pipe(debounceTime(500))
      .subscribe(data => {
        let searchText = this.form.get('search')?.value;
        console.log(searchText);
        this.dietService.getFilteredMeals(searchText,this.form.get('mealType')?.value,
          this.form.get('mealDifficulty')?.value).subscribe( data =>{  for(let i=0; i<data.length; i++){
            data[i].position = i+1;
          }
            console.log(data);
            this.mealFilters = data;
            this.dataSource =  new MatTableDataSource<MealFilter>(this.mealFilters);
            this.dataSource.paginator = this.paginator;
          }
        );
      })

    this.dietService.getFilteredMeals('','','').subscribe( data =>{
        for(let i=0; i<data.length; i++){
          data[i].position = i+1;
        }
        this.mealFilters = data;
        this.dataSource =  new MatTableDataSource<MealFilter>(this.mealFilters);
        this.dataSource.paginator = this.paginator;
      }
    );
  }

}

export interface MealFilter {
  position: number,
  name: string,
  urlImage: string,
  mealDifficulty: string,
  type: string
}
