/**
 * Angular 2 decorators and services
 */
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  ViewChild,
  DoCheck,
} from '@angular/core'
import * as GaugeChart from 'gauge-chart'

/**
 * GaugeChart Component
 */
@Component({
  selector: 'rg-gauge-chart',
  templateUrl: './gauge-chart.component.html',
  styleUrls: ['./gauge-chart.component.css'],
})
export class GaugeChartComponent implements OnInit, OnChanges, DoCheck {
  @ViewChild('gaugeArea', { static: true }) gaugeArea

  @Input() canvasWidth: number
  @Input() needleValue: number
  @Input() centralLabel: string
  @Input() options
  @Input() wrapOptions?
  @Input() name?: string
  @Input() nameFont?: string
  @Input() bottomLabel?: string
  @Input() bottomLabelFont?: string

  public nameMargin: string
  public bottomLabelMargin: string

  private element
  private gaugeChart: any
  private oldOptions

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
      this.drawChart()
    }
    this.oldOptions = JSON.parse(JSON.stringify(this.options))
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

  ngDoCheck() {
    if (!this.areEqual(this.options, this.oldOptions)) {
      this.drawChart(true)
      this.oldOptions = JSON.parse(JSON.stringify(this.options))
    }
  }

  areEqual(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2)
  }

  drawChart(redraw = false) {
    if (redraw) {
      this.gaugeChart.removeGauge()
    }
    this.options.centralLabel = this.centralLabel
    this.gaugeChart = GaugeChart.gaugeChart(
      this.element,
      this.canvasWidth,
      this.options,
    )
    this.gaugeChart.updateNeedle(this.needleValue)
  }

  ngOnChanges(changes) {
    if (changes.needleValue && !changes.needleValue.firstChange) {
      this.needleValue = changes.needleValue.currentValue
      this.gaugeChart.updateNeedle(this.needleValue)
    }
    if (changes.centralLabel && !changes.centralLabel.firstChange) {
      this.centralLabel = changes.centralLabel.currentValue
      this.drawChart(true)
    }
  }
}
