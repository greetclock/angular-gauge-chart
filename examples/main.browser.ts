/**
 * Angular bootstrapping
 */
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
/**
 * App Module
 * our top level module that holds all of our components
 */
import { AppModule } from './app'

platformBrowserDynamic().bootstrapModule(AppModule)
