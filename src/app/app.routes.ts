import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'calendar',
    loadChildren: () =>
      import('./components/calendar/calendar.module').then((m) => m.CalendarModule),
  },
  {
    path: 'appointments',
    loadChildren: () =>
      import('./components/appointment/appointment-form.component').then(
        (m) => m.AppointmentFormComponent
      ),
  },
  { path: '', redirectTo: '/calendar', pathMatch: 'full' },
];
