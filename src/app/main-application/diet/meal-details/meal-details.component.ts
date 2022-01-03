import {Component, OnInit, Inject, ViewEncapsulation, OnDestroy} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {InteractionService} from "../../../services/interaction.service";
import {DietService} from "../../../services/diet.service";
import {ActivatedRoute} from "@angular/router";
import {IMealDetails} from "./i-meal-details";
import {Location} from "@angular/common";

@Component({
  selector: 'app-meal-details',
  templateUrl: './meal-details.component.html',
  styleUrls: ['./meal-details.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MealDetailsComponent implements OnInit, OnDestroy {


   mealDetails!: IMealDetails;

  constructor(private interactionService: InteractionService, private mealService: DietService,
              private route: ActivatedRoute, private location: Location) {

  }

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    this.mealService.getMealDetailsById(id).subscribe(data => {
      this.mealDetails = data;

    })
  }
  ngOnDestroy(){
    this.interactionService.sendMessage("true");
  }

  goBack() {
    this.location.back();
  }

}
