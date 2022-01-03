import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Measurement} from "../../../auth/registration/registration.component";
import {HttpClient} from "@angular/common/http";
import {IngredientFilter} from "../add-meal/ingredient-filter/ingredient-filter.component";
import {MeasurementService} from "../../../services/measurement.service";
import {InteractionService} from "../../../services/interaction.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-measurement',
  templateUrl: './measurement.component.html',
  styleUrls: ['./measurement.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MeasurementComponent implements OnInit {
  measurements: Measurement[] = [] ;
  activeMeasurement!: Measurement;

  constructor(private measurementService: MeasurementService, private interactionService: InteractionService,
              private router: Router) { }

  ngOnInit(): void {
     this.measurementService.getMeasurements().subscribe(data => {
       console.log(data)
       if(data.length >= 2){
         this.measurements = data.slice(1, data.length);
         this.activeMeasurement = data[0];
       }
    })
  }

  addMeasurement() {
    this.interactionService.sendMessage("false");
    this.router.navigate(['app/measurement/add']);

  }
}
