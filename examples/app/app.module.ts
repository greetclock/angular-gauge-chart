import { BrowserModule } from '@angular/platform-browser'
import { Component, NgModule } from '@angular/core'

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment'
// App is our top level component
import { GaugeChartComponent } from '../../src/gauge-chart'
import { AppComponent } from './app.component'

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [AppComponent],
  declarations: [GaugeChartComponent, AppComponent],
  /**
   * Import Angular's modules.
   */
  imports: [BrowserModule],
  /**
   * Expose our Services and Providers into Angular's dependency injection.
   */
  providers: [ENV_PROVIDERS],
})
export class AppModule {}
