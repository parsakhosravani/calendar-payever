import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'calendar',
    loadChildren: () => import('./components/calendar/calendar.module').then(m => m.CalendarModule),
  },
  { path: '', redirectTo: '/calendar', pathMatch: 'full' },
];
