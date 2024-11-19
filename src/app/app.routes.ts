import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./components/dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'calendar',
    loadChildren: () =>
      import('./components/calendar/calendar.module').then((m) => m.CalendarModule),
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];
