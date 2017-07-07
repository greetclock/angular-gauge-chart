/**
 * Angular 2 decorators and services
 */
import { Component, OnInit } from '@angular/core';

/**
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  template: `
    <gauge-chart [gaugeOptions]="initialGaugeOptions"></gauge-chart>
  `
})
export class AppComponent implements OnInit {
  public initialGaugeOptions

  ngOnInit() {
    this.initialGaugeOptions = {
      elementName: 'gaugeArea', // !Obligatory field! element to insert the chart to
      canvasWidth: 300, // !Obligatory field!
      needleValue: 70, // !Obligatory field!
      gaugeOptions: {
        hasNeedle: true,
        needleColor: 'gray',
        needleUpdateSpeed: 1000,
        arcColors: ['rgb(44, 151, 222)', 'lightgray'],
        arcDelimiters: [30],
        rangeLabel: ['0', '100'],
        centralLabel: '80',
      },
    }
  }
}
