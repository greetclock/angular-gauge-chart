/**
 * Angular 2 decorators and services
 */
import { Component, Input, OnInit } from '@angular/core'
import * as GaugeChart from 'gauge-chart'

/**
 * GaugeChart Component
 * Second Level Component
 */
@Component({
  selector: 'gauge-chart',
  template: `
    <div id="gaugeArea"></div>
  `
})
export class GaugeChartComponent implements OnInit {
  @Input() gaugeOptions

  ngOnInit() {
    if (this.optionsCheck()) {
      let element = document.querySelector('#' + this.gaugeOptions.elementName)

      GaugeChart // Drawing and updating the chart
        .gaugeChart(element, this.gaugeOptions.canvasWidth, this.gaugeOptions.gaugeOptions)
        .updateNeedle(this.gaugeOptions.needleValue)
    }
  }

  optionsCheck() {
    if (!this.gaugeOptions.elementName) {
      console.warn('gauge-chart warning: elementName is not specified!')
      return false
    } else if (!this.gaugeOptions.canvasWidth) {
      console.warn('gauge-chart warning: canvasWidth is not specified!')
      return false
    } else if (!this.gaugeOptions.needleValue) {
      console.warn('gauge-chart warning: needleValue is not specified!')
      return false
    }
    return true
  }
}
