import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  {
    path: 'calendar',
    loadChildren: () =>
      import('./components/calendar/calendar.module').then((m) => m.CalendarModule),
  },
  { path: '', redirectTo: '/calendar', pathMatch: 'full' },
];
