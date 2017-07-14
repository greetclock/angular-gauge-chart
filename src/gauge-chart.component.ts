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
  @Input() centralLabel: string
  @Input() options

  private element
  private gaugeChart: any

  ngOnInit() {
    if (this.optionsCheck()) {
      this.element = this.gaugeArea.nativeElement
      this.options.centralLabel = this.centralLabel
      this.gaugeChart = GaugeChart // Drawing and updating the chart
        .gaugeChart(this.element, this.canvasWidth, this.options)
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
    if (this.centralLabel == null) {
      this.centralLabel = ''
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
      if (changes.centralLabel &&
      changes.centralLabel.currentValue !== changes.centralLabel.previousValue) {
        this.gaugeChart.removeGauge()
        this.centralLabel = changes.centralLabel.currentValue
        this.options.centralLabel = this.centralLabel
        this.gaugeChart = GaugeChart
          .gaugeChart(this.element, this.canvasWidth, this.options)
        this.gaugeChart.updateNeedle(this.needleValue)
      }
    }
  }
}
