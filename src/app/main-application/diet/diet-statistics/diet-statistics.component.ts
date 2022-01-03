import { Component, OnInit } from '@angular/core';
import * as Highcharts from "highcharts";
import {StatisticsService} from "../../../services/statistics.service";

@Component({
  selector: 'app-diet-statistics',
  templateUrl: './diet-statistics.component.html',
  styleUrls: ['./diet-statistics.component.css']
})
export class DietStatisticsComponent implements OnInit {
  months = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec',
    'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];
  chosenMonth= new Date().getMonth();
  chosenYear = new Date().getFullYear();
  currentDate = this.months[this.chosenMonth] + ', ' + this.chosenYear.toString();

  constructor(private statisticsService: StatisticsService) { }

  ngOnInit(): void {
    this.maxByProperty = 'weight';
    this.setMeasurementChart();
    this.setNutrientChart();
  }
  setMeasurementChart(){
    this.statisticsService.getDietMeasurementProgress(this.maxByProperty).subscribe(result => {
      this.chartOptions.series = [{
        data: result.data,
        type: 'line'
      }];
      this.chartOptions.title = {
        text: "Przegląd zmian dla pomiaru: " + result.measurementName
      }
      this.updateFromLineChart = true;
    })
  }
  setNutrientChart(){
    let date = this.chosenYear + '-' + (this.chosenMonth + 1).toString().padStart(2, '0') + '-01';
    this.statisticsService.getDietNutrientProgress(this.nutrient, date).subscribe(data => {
      this.nutrientOptions.series = [{
        data: data.data,
        type: 'bar',
        color: '#0d233a'
      }];
      this.nutrientOptions.title = {
        text: "Wykres ilości spożywanego składnika odżywczego: " + data.measurementName + " w miesiącu: " + this.currentDate
      }
      this.updateNutrient = true;
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
    this.setNutrientChart();
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
    this.setNutrientChart();
  }

  chartOptions: Highcharts.Options = {
    title: {
      text: "Przegląd zmian dla pomiaru: waga"
    },
    xAxis: {
      type: 'datetime'
    },
    yAxis: {
      title: {
        text: "cm"
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
      name: 'Pomiar'
    }]
  }
  highcharts = Highcharts;
  updateFromLineChart: any;
  selectedVal: string = '';
  maxByProperty: any;
  nutrient: string = 'calories';
  nutrientChart= Highcharts;
  nutrientOptions: Highcharts.Options = {
    title: {
      text: "Przegląd zmian dla: kalorii"
    },
    xAxis: {
      type: 'datetime'
    },
    yAxis: {
      title: {
        text: "g"
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
      name: 'Pomiar'
    }]
  }
  updateNutrient: any;

  sort() {

    this.setMeasurementChart();
  }

  pickNutrient() {
    this.setNutrientChart();

  }
}
export interface MeasurementProgress{
  data: number [],
  measurementName: string
}
