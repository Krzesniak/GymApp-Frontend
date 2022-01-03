import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {FormBuilder, FormGroup} from "@angular/forms";
import {IngredientService} from "../../../../services/ingredient.service";
import {debounceTime} from "rxjs/operators";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-ingredient-filter',
  templateUrl: './ingredient-filter.component.html',
  styleUrls: ['./ingredient-filter.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class IngredientFilterComponent implements OnInit {

  ingredientFilters!: IngredientFilter[];

  ingredientName: String = 'Wyciskanie sztangi na ławce poziomej';
  ingredientID: String = '';
  displayedColumns: string[] = ['Numer', 'Nazwa składniku'];
  selectedRowIndex: any = -1;

  dataSource: any;
  form: FormGroup;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private fb: FormBuilder, private ingredientService: IngredientService, private elRef: ElementRef) {
    this.form = this.fb.group({
      search: ['']
    })
  }

  ngOnInit(): void {
    this.form.valueChanges
      .pipe(debounceTime(500))
      .subscribe(data => {
        let searchText = this.form.get('search')?.value;
        this.ingredientService.getFilteredIngredients(searchText).subscribe(data => {
            for (let i = 0; i < data.length; i++) {
              data[i].position = i + 1;
            }
            this.ingredientFilters = data;
            this.dataSource = new MatTableDataSource<IngredientFilter>(this.ingredientFilters);
            this.dataSource.paginator = this.paginator;
          }
        );
      })

    this.ingredientService.getFilteredIngredients('').subscribe( data =>{
      console.log(data);
        for(let i=0; i<data.length; i++){
          data[i].position = i+1;
        }
        this.ingredientFilters = data;
        this.dataSource =  new MatTableDataSource<IngredientFilter>(this.ingredientFilters);
        this.dataSource.paginator = this.paginator;
      }
    );
  }
  getRecord(row: any) {
    this.selectedRowIndex = row.ingredientID;
    this.ingredientID =  row.ingredientID;
  }

}

export interface IngredientFilter {
  position: number,
  ingredientName: string,
  ingredientID: string,
}

