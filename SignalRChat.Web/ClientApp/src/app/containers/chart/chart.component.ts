import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { SignalrChartService } from 'src/app/services/signalr-chart.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  chartOptions : ChartConfiguration['options'] = {
    responsive : true,
    scales : {
      y: {
        min : 0
      }
    }
  };

  chartLabels: string[] = ["Real time data for the chart"];

  chartType : ChartType = "bar";

  chartLegend : boolean = true;

  constructor(public chartSignalrService : SignalrChartService) {}

  ngOnInit(): void {
      this.chartSignalrService.connect();
      this.chartSignalrService.getChartDataFromApi();
  }
}
