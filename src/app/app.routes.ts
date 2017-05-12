import { Routes } from '@angular/router';
import { NoContentComponent } from './no-content';

export const ROUTES: Routes = [
  { path: '**',    component: NoContentComponent },
];
