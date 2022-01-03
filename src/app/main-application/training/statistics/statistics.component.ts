import {Component, Input, OnInit} from '@angular/core';
import * as Highcharts from 'highcharts';
import theme from 'highcharts/themes/dark-unica';
import {StatisticsService} from "../../../services/statistics.service";
import {TrainingEditFormComponent} from "../training-details/training-edit-form/training-edit-form.component";
import {MatDialog} from "@angular/material/dialog";
import {ExerciseFilterDialogComponent} from "./exercise-filter-dialog/exercise-filter-dialog.component";
import {ExerciseService} from "../../../services/exercise.service";
import {InteractionService} from "../../../services/interaction.service";
theme(Highcharts);

declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  months = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec',
    'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];
  chosenMonth= new Date().getMonth();
  chosenYear = new Date().getFullYear();
  currentDate = this.months[this.chosenMonth] + ', ' + this.chosenYear.toString();

  chosenMonthPieChart= new Date().getMonth();
  chosenYearPieChart = new Date().getFullYear();
  currentDatePieChart = this.months[this.chosenMonthPieChart] + ', ' + this.chosenYearPieChart.toString();

  columnChartYearChosen = new Date().getFullYear();

  updateFromInput = false;
  updateFromLineChart = false;
  exerciseName: string = 'Wyciskanie sztangi leżąc'

  highcharts = Highcharts;
  barChart = Highcharts;
  pieChart = Highcharts;

  barChartOptions: Highcharts.Options = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Ilość wykonanych treningów w roku na przestrzeni miesięcy'
    },
    xAxis: {
      categories: [
        'Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'
      ],
      crosshair: true
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Ilośc treningów'
      }
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0
      }
    },
    series: [{
      data: [],
      type: 'column',
      name: 'Ilość treningów'
    }]
  }
  chartOptions: Highcharts.Options = {
    title: {
      text: "Progres ćwiczenia: " + this.exerciseName
    },
    xAxis: {
      type: 'datetime'
    },
    yAxis: {
      title: {
        text: "kg"
      }
    },
    series: [{
      data: [{
        x: 1637452800,
        y: 29.9
      },
        {
          x: 1267401600000,
          y: 71.5
        },
        {
          x: 1270080000000,
          y: 106.4
        }
      ],
      type: 'line',
      name: 'Wynik'
    }]
  }
  pieChartOptions: Highcharts.Options = {
    // @ts-ignore
    colors: Highcharts.map(Highcharts.getOptions().colors, function (color: Highcharts.ColorType) {
      return {
        radialGradient: {
          cx: 0.5,
          cy: 0.3,
          r: 0.7
        },
        stops: [
          [0, color],
          [1, Highcharts.color(color).brighten(-0.3).get('rgb')] // darken
        ]
      };
    }),
    chart: {
      plotShadow: false,
      type: 'pie'
    },
    title: {
      text: 'Ilość wykonywanych ćwiczeń na daną partię mięsniową w miesiącu ' + this.months[this.chosenMonthPieChart] + ', ' + this.chosenYearPieChart.toString()
    },
    tooltip: {
      pointFormat: '{series.name}:  <b>{point.y:.1f}</b>'
    },
    accessibility: {
      point: {
        valueSuffix: '%'
      }
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
          connectorColor: 'silver'
        }
      }
    },
    series: [{
      name: 'Ilość ćwiczeń',
      data: [],
      type: "pie"
    }]
  }
  updatedPieChart: boolean = false;
  headerDate!: TrainingsDone;

  constructor(private statisticsService: StatisticsService, private dialog: MatDialog,
              private interactionService: InteractionService) { }

  getHeaderDate(){
    return this.chosenYear + '-' + (this.chosenMonth +1).toString().padStart(2, '0') + '-01';
  }
  ngOnInit() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    this.statisticsService.getHeaderTraining(this.getHeaderDate()).subscribe(data => {
      this.headerDate = data;
    });
    var todayFormat = yyyy + '-' + mm + '-' + dd;
    this.statisticsService.getNumberOfTrainingInYear(todayFormat).subscribe(result => {
      this.barChartOptions.series = [{
        data: result,
        type: 'column',
        color: '#0d233a'
      }]
      this.updateFromInput =true;
    })
    this.statisticsService.getNumberOfTrainingType(todayFormat).subscribe(result => {
      this.pieChartOptions.series = [{
        data: result,
        type: 'pie'
      }]
      this.updatedPieChart = true;
    })
    this.statisticsService.getExerciseProgress('ffb7185e-ceb0-42d9-8d28-c155c97b39ec').subscribe( result => {
      this.chartOptions.series = [{
        data: result.data,
        type: 'line'
      }];
      this.exerciseName = result.exerciseName
      this.chartOptions.title = {
        text: "Progres ćwiczenia: " + this.exerciseName
      }
      this.updateFromLineChart = true;
    })

  }
  addMonth() {
    if(this.chosenMonth == 11){
      this.chosenYear += 1;
      this.chosenMonth = 0;
    }else {
      this.chosenMonth++;
    }
    this.currentDate = this.months[this.chosenMonth] + ', ' + this.chosenYear.toString();
    this.statisticsService.getHeaderTraining(this.getHeaderDate()).subscribe(data => {
      this.headerDate = data;
    });
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
    this.statisticsService.getHeaderTraining(this.getHeaderDate()).subscribe(data => {
      this.headerDate = data;
    });
  }
  addMonthToPieChart(){
    if(this.chosenMonthPieChart == 11){
      this.chosenYearPieChart += 1;
      this.chosenMonthPieChart = 0;
    }else {
      this.chosenMonthPieChart++;
    }
    this.currentDatePieChart = this.months[this.chosenMonthPieChart] + ', ' + this.chosenYearPieChart.toString();
    this.pieChartOptions.title  = {
      text: 'Ilość wykonywanych ćwiczeń na daną partię mięsniową w miesiącu ' + this.months[this.chosenMonthPieChart] + ', ' + this.chosenYearPieChart.toString()
    }
    let month = String(this.chosenMonthPieChart + 1).padStart(2, '0');

    let day = this.chosenYearPieChart.toString() + '-' + month + '-01'
    console.log(day);
    this.statisticsService.getNumberOfTrainingType(day).subscribe(result => {
      this.pieChartOptions.series = [{
        data: result,
        type: 'pie'
      }]
      this.updatedPieChart = true;
    })
  }
  subtractMonthToPieChart(){
    if(this.chosenMonthPieChart == 0){
      this.chosenMonthPieChart = 11;
      this.chosenYearPieChart--;
    }
    else{
      this.chosenMonthPieChart--;
    }
    this.currentDatePieChart = this.months[this.chosenMonthPieChart] + ', ' + this.chosenYearPieChart.toString();
    this.pieChartOptions.title  = {
      text: 'Ilość wykonywanych ćwiczeń na daną partię mięsniową w miesiącu '
        + this.months[this.chosenMonthPieChart] + ', ' + this.chosenYearPieChart.toString()
    }
    let month = String(this.chosenMonthPieChart + 1).padStart(2, '0');
    let day = this.chosenYearPieChart.toString() + '-' + month + '-01'
    console.log(day);
    this.statisticsService.getNumberOfTrainingType(day).subscribe(result => {
      this.pieChartOptions.series = [{
        data: result,
        type: 'pie'
      }]
      this.updatedPieChart = true;
    })
  }


  subtractYear() {
    this.columnChartYearChosen--;
    let date = this.columnChartYearChosen + '-01-01';
    this.statisticsService.getNumberOfTrainingInYear(date).subscribe(result => {
      this.barChartOptions.series = [{
        data: result,
        type: 'column',
        color: '#0d233a'
      }]
      this.updateFromInput =true;
    })

  }

  addYear() {
    this.columnChartYearChosen++;
    let date = this.columnChartYearChosen + '-01-01';
    this.statisticsService.getNumberOfTrainingInYear(date).subscribe(result => {
      this.barChartOptions.series = [{
        data: result,
        type: 'column',
        color: '#0d233a'
      }]
      this.updateFromInput =true;
    })
  }

  openFilterExerciseDialog() {
   let dialogRef =  this.dialog.open(ExerciseFilterDialogComponent,
      {
        maxWidth: '100vw',
        maxHeight: '100vh',
        height: '100%',
        width: '100%'
      }/*{ disableClose: true }*/);
   dialogRef.afterClosed().subscribe(data => {
     if(data != 'null'){
       this.statisticsService.getExerciseProgress(data).subscribe( result => {
         console.log(result);
         this.chartOptions.series = [{
           data: result.data,
           type: 'line'
         }];
         this.exerciseName = result.exerciseName
         this.chartOptions.title = {
             text: "Progres ćwiczenia: " + this.exerciseName
         }
         this.updateFromLineChart = true;
       })
     }
   })
  }
}
export interface Point{
  x: number,
  y: number
}
export interface ProgressChart{
  data: number [],
  exerciseName: string
}
export interface TrainingsDone{
  numberOfTrainingsDone: number,
  numberOfTrainingsToDo: number
}

