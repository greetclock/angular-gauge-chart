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
      [options]="options"
      [name]="name"
      [bottomLabel]="bottomLabel"></gauge-chart>
  `
})
export class AppComponent implements OnInit {
  public canvasWidth: number
  public needleValue: number
  public centralLabel: string
  public options
  public name = 'Gauge chart'
  // public nameFont = 30
  public bottomLabel = '65'
  // public bottomLabelFont = 28

  ngOnInit() {
    this.canvasWidth = 500
    this.needleValue = 65
    // this.centralLabel = '' + this.needleValue
    this.options = {
        hasNeedle: true,
        needleColor: 'gray',
        needleUpdateSpeed: 1000,
        arcColors: ['rgb(44, 151, 222)', 'lightgray'],
        arcDelimiters: [30],
        rangeLabel: ['0', '100'],
        needleStartValue: 50,
      }

    /*setInterval(() => {
        this.bottomLabel = '' + (+this.bottomLabel + 10) + '.0'
      }, 2000)*/
  }
}
