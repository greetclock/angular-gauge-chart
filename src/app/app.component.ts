import { Component, OnInit } from '@angular/core'

/**
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app-root',
  template: `
    <rg-gauge-chart
      [canvasWidth]="canvasWidth"
      [needleValue]="needleValue"
      [centralLabel]="centralLabel"
      [options]="options"
      [name]="name"
      [bottomLabel]="bottomLabel"
    ></rg-gauge-chart>
  `,
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
    this.canvasWidth = 300
    this.needleValue = 65
    // this.centralLabel = '' + this.needleValue
    this.options = {
      hasNeedle: true,
      outerNeedle: false,
      needleColor: 'gray',
      needleStartValue: 10,
      needleUpdateSpeed: 1000,
      // arc options
      arcColors: [],
      arcDelimiters: [10, 60, 90],
      arcPadding: 6,
      arcPaddingColor: 'white',
      arcLabels: ['35', '210', '315'],
    }

    /*setInterval(() => {
        this.bottomLabel = '' + (+this.bottomLabel + 10) + '.0'
      }, 2000)*/
  }
}
