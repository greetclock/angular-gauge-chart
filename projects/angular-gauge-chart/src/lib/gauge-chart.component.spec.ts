import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'

import { GaugeChartComponent } from './gauge-chart.component'

describe('GaugeChartComponent', () => {
  let component: GaugeChartComponent
  let fixture: ComponentFixture<GaugeChartComponent>

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [GaugeChartComponent],
      }).compileComponents()
    }),
  )

  beforeEach(() => {
    fixture = TestBed.createComponent(GaugeChartComponent)
    component = fixture.componentInstance
  })

  it('should create', () => {
    expect(component && component.gaugeArea).toBeDefined()
  })
})
