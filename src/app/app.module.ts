import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { GaugeChartModule } from '../../projects/angular-gauge-chart/src/public_api'
import { AppComponent } from './app.component'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, GaugeChartModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
