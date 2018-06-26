import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppComponent } from './app.component'
import { GaugeChartComponent } from 'angular-gauge-chart'

@NgModule({
  declarations: [AppComponent, GaugeChartComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
