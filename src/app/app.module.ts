import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppComponent } from './app.component'
import { GaugeChartModule } from 'angular-gauge-chart'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, GaugeChartModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
