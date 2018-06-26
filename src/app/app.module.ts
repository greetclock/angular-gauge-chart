import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { GaugeChartComponent } from '@recogizer/angular-gauge-chart'
import { AppComponent } from './app.component'

@NgModule({
  declarations: [AppComponent, GaugeChartComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
