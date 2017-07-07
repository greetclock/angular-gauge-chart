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
     [extraGaugeOptions]="extraGaugeOptions"></gauge-chart>
  `
})
export class AppComponent implements OnInit {
  public canvasWidth: number
  public needleValue: number
  public extraGaugeOptions

  ngOnInit() {
    this.canvasWidth = 300
    this.needleValue = 0
    this.extraGaugeOptions = {
        hasNeedle: true,
        needleColor: 'gray',
        needleUpdateSpeed: 1000,
        arcColors: ['rgb(44, 151, 222)', 'lightgray'],
        arcDelimiters: [30],
        rangeLabel: ['0', '100'],
        centralLabel: '' + this.needleValue,
      }

    setInterval(() => {
        this.needleValue += 10
      }, 10000)
  }
}
