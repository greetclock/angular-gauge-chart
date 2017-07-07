/**
 * Angular 2 decorators and services
 */
import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core'
import * as GaugeChart from 'gauge-chart'

/**
 * GaugeChart Component
 */
@Component({
  selector: 'gauge-chart',
  template: `
    <div #gaugeArea></div>
  `
})
export class GaugeChartComponent implements OnInit, OnChanges {
  @ViewChild('gaugeArea') gaugeArea

  @Input() canvasWidth: number
  @Input() needleValue: number
  @Input() extraGaugeOptions

  private element
  private gaugeChart: any

  ngOnInit() {
    if (this.optionsCheck()) {
      this.element = this.gaugeArea.nativeElement

      this.gaugeChart = GaugeChart // Drawing and updating the chart
        .gaugeChart(this.element, this.canvasWidth, this.extraGaugeOptions)
      this.gaugeChart.updateNeedle(this.needleValue)
    }
  }

  optionsCheck() {
    if (this.canvasWidth == null) {
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
        this.needleValue = changes.needleValue.currentValue
        this.gaugeChart.updateNeedle(this.needleValue)
      }
      if (changes.extraGaugeOptions &&
      changes.extraGaugeOptions.currentValue !== changes.extraGaugeOptions.previousValue) {
        this.gaugeChart.removeGauge()
        this.extraGaugeOptions = changes.extraGaugeOptions.currentValue
        this.gaugeChart = GaugeChart
          .gaugeChart(this.element, this.canvasWidth, this.extraGaugeOptions)
        this.gaugeChart.updateNeedle(this.needleValue)
      }
    }
  }
}
