/**
 * Angular 2 decorators and services
 */
import { Component, Input, OnInit } from '@angular/core'
import * as GaugeChart from 'gauge-chart'

/**
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'gauge-chart',
  template: `
    <div id="gaugeArea"></div>
  `
})
export class GaugeChartComponent implements OnInit {
  @Input() needlevalue: string
  @Input() chartwidth: string

  @Input() test: string

  ngOnInit() {
    console.log(this.test)
    // Element inside which you want to see the chart
    let element = document.querySelector('#gaugeArea')

    // Properties of the gauge
    let gaugeOptions = {
      hasNeedle: true,
      needleColor: 'gray',
      needleUpdateSpeed: 1000,
      arcColors: ['rgb(44, 151, 222)', 'lightgray'],
      arcDelimiters: [30],
      rangeLabel: ['0', '100'],
      centralLabel: '50',
    }

    // Drawing and updating the chart
    GaugeChart
      .gaugeChart(element, 300, gaugeOptions)
      .updateNeedle(50)
  }
}
