import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {TrainingService} from "../../../services/training.service";
import {TrainingDetails} from "../training-details";
import {ActivatedRoute} from "@angular/router";
import {InteractionService} from "../../../services/interaction.service";
import {Location} from "@angular/common";
import {TrainingEditFormComponent} from "./training-edit-form/training-edit-form.component";

@Component({
  selector: 'app-training-details',
  templateUrl: './training-details.component.html',
  styleUrls: ['./training-details.component.css']
})
export class TrainingDetailsComponent implements OnInit, OnDestroy {
  trainingDetails!: TrainingDetails;

  constructor(private trainingService:TrainingService, private route: ActivatedRoute, private interactionService: InteractionService,
              private location: Location, private dialog: MatDialog) {
    let id = this.route.snapshot.params['id'];
    trainingService.getTrainingDetails(id).subscribe(training => {
      this.trainingDetails = training;
    })
  }

  ngOnInit(): void {

  }

  goBack() {
    this.location.back();

  }
  ngOnDestroy(){
    this.interactionService.sendMessage('true');
  }

  edit(id: string) {
    this.dialog.open(TrainingEditFormComponent, {data: {trainingID: id}});
  }
}
