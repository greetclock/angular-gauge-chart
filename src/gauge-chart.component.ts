/**
 * Angular 2 decorators and services
 */
import { Component, Input, OnChanges, OnInit } from '@angular/core'
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
  //@Input() gaugeOptions
  @Input() elementName
  @Input() canvasWidth
  @Input() needleValue
  @Input() extraGaugeOptions

  private element
  private gaugeChart: any

  ngOnInit() {
    if (this.optionsCheck()) {
      this.element = document.querySelector('#' + this.elementName)
      //view child native element

      this.gaugeChart = GaugeChart // Drawing and updating the chart
        .gaugeChart(this.element, this.canvasWidth, this.extraGaugeOptions)
      this.gaugeChart.updateNeedle(this.needleValue)
    }
  }

  optionsCheck() {
    if (this.elementName == null) {
      console.warn('gauge-chart warning: elementName is not specified!')
      return false
    } else if (this.canvasWidth == null) {
      console.warn('gauge-chart warning: canvasWidth is not specified!')
      return false
    } else if (this.needleValue == null) {
      console.warn('gauge-chart warning: needleValue is not specified!')
      return false
    }
    return true
  }

  ngOnChanges(changes) {
    if (!changes.needleValue.firstChange) {
      if (changes.needleValue &&
      changes.needleValue.currentValue !== changes.needleValue.previousValue) {
       this.gaugeChart.updateNeedle(this.needleValue)
      }
      if (changes.extraGaugeOptions &&
      changes.extraGaugeOptions.currentValue !== changes.extraGaugeOptions.previousValue) {
        this.extraGaugeOptions = changes.extraGaugeOptions
        this.gaugeChart = GaugeChart // Drawing and updating the chart
        .gaugeChart(this.element, this.canvasWidth, this.extraGaugeOptions)
      }
    }
  }
}
