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
    <gauge-chart
     [canvasWidth]="canvasWidth"
     [needleValue]="needleValue"
     [centralLabel]="centralLabel"
     [extraGaugeOptions]="extraGaugeOptions"></gauge-chart>
  `
})
export class AppComponent implements OnInit {
  public canvasWidth: number
  public needleValue: number
  public centralLabel: string
  public extraGaugeOptions

  ngOnInit() {
    this.canvasWidth = 500
    this.needleValue = 0
    this.centralLabel = '' + this.needleValue
    this.extraGaugeOptions = {
        hasNeedle: true,
        needleColor: 'gray',
        needleUpdateSpeed: 1000,
        arcColors: ['rgb(44, 151, 222)', 'lightgray'],
        arcDelimiters: [30],
        rangeLabel: ['0', '100'],
      }

    /*setInterval(() => {
        this.needleValue += 10
        this.centralLabel = '' + this.needleValue
      }, 10000)*/
  }
}
