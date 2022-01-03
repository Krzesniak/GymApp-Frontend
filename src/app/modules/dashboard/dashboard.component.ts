import { Component, OnInit } from '@angular/core';
import {StatisticsService} from "../../services/statistics.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentDate: Date = new Date();
  summary!: SummaryDto;
  constructor(private statisticsService: StatisticsService) {
    var date = this.currentDate.getFullYear().toString() + '-'
    + (this.currentDate.getMonth() + 1).toString().padStart(2, '0') + '-' + this.currentDate.getDate();
    this.statisticsService.getSummary(date).subscribe(data => {
      this.summary = data;
    })
  }

  ngOnInit(): void {
  }

}
export interface SummaryDto{
  incomingTrainingDate: Date,
  lastTrainingDate: Date,
  incomingDietDate: Date,
  lastDietDate: Date,
  lastMeasurement: Date
}
