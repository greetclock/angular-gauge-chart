/**
 * Angular 2 decorators and services
 */
import { Component } from '@angular/core';

/**
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  template: `
    <main>
      Hi!
    </main>
  `
})
export class AppComponent {}
