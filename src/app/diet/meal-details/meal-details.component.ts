import {Component, OnInit, Inject, ViewEncapsulation, OnDestroy} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {InteractionService} from "../../services/interaction.service";
import {DietService} from "../../services/diet.service";
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
   priceListMap : Map<string, any> = new Map<string, any>();

  constructor(private interactionService: InteractionService, private mealService: DietService,
              private route: ActivatedRoute, private location: Location) {
    this.priceListMap.set("Wafle ryżowe", {details: "32 g", overall: "4 sztuki"});
    this.priceListMap.set("Wiórki kokosowe", {details: "32 g", overall: "4 sztuki"});
    this.priceListMap.set("Wiórki kokosowe1", {details: "32 g", overall: "4 sztuki"});
    this.priceListMap.set("Wiórki kokosowe2", {details: "32 g", overall: "4 sztuki"});
    this.priceListMap.set("Wiórki kokosowe3", {details: "32 g", overall: "4 sztuki"});
    this.priceListMap.set("Wiórki kokosowe4", {details: "32 g", overall: "4 sztuki"});
    this.priceListMap.set("Wiórki kokosowe5", {details: "32 g", overall: "4 sztuki"});

    console.log(this.mealDetails);
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
