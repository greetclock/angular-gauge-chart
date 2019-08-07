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
  templateUrl: './gauge-chart.component.html',
  styleUrls: ['./gauge-chart.component.scss'],
})
export class GaugeChartComponent implements OnInit, OnChanges {
  @ViewChild('gaugeArea', { static: true }) gaugeArea

  @Input() canvasWidth: number
  @Input() needleValue: number
  @Input() centralLabel: string
  @Input() options
  @Input() name: string
  @Input() nameFont: string
  @Input() bottomLabel: string
  @Input() bottomLabelFont: string

  public nameMargin: string
  public bottomLabelMargin: string

  private element
  private gaugeChart: any

  ngOnInit() {
    // calculate styles for name and bottomLabel
    if (this.name) {
      if (!this.nameFont) {
        this.nameFont = '' + Math.round(this.canvasWidth / 15)
      }
      this.nameMargin = '' + Math.round(+this.nameFont / 4)
    }

    if (this.bottomLabel) {
      if (!this.bottomLabelFont) {
        this.bottomLabelFont = '' + Math.round(this.canvasWidth / 10)
      }
      this.bottomLabelMargin = '-' + this.bottomLabelFont
    }

    if (this.optionsCheck()) {
      this.element = this.gaugeArea.nativeElement
      this.options.centralLabel = this.centralLabel
      // Drawing and updating the chart
      this.gaugeChart = GaugeChart.gaugeChart(
        this.element,
        this.canvasWidth,
        this.options,
      )
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
    if (changes.needleValue && !changes.needleValue.firstChange) {
      if (
        changes.needleValue.currentValue !== changes.needleValue.previousValue
      ) {
        this.needleValue = changes.needleValue.currentValue
        this.gaugeChart.updateNeedle(this.needleValue)
      }
    }
    if (changes.centralLabel && !changes.centralLabel.firstChange) {
      if (
        changes.centralLabel.currentValue !== changes.centralLabel.previousValue
      ) {
        this.gaugeChart.removeGauge()
        this.centralLabel = changes.centralLabel.currentValue
        this.options.centralLabel = this.centralLabel
        this.gaugeChart = GaugeChart.gaugeChart(
          this.element,
          this.canvasWidth,
          this.options,
        )
        this.gaugeChart.updateNeedle(this.needleValue)
      }
    }
    if (changes.centralLabel && !changes.centralLabel.firstChange) {
      if (
        changes.bottomLabel.currentValue !== changes.bottomLabel.previousValue
      ) {
        console.log(changes.bottomLabel.currentValue)
      }
    }
  }
}
