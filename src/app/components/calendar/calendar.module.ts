import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CalendarComponent } from './calendar.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CalendarComponent,
    RouterModule.forChild([{ path: '', component: CalendarComponent }]),
  ],
})
export class CalendarModule {}
