import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DragDropModule, CdkDragDrop } from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { Appointment } from '../appointment/models/appointment.interface';
import { Observable } from 'rxjs';
import { AppointmentService } from '../appointment/services/appointment.service';
import { AppointmentFormComponent } from '../appointment/appointment-form.component';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DragDropModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatIconModule,
  ],
})
export class CalendarComponent implements OnInit {
  weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  calendarDays: Date[] = [];
  appointments$: Observable<Appointment[]>;
  currentMonth: Date;
  selectedMonth: Date;

  constructor(
    @Inject(MatDialog) private dialog: MatDialog,
    @Inject(AppointmentService) private appointmentService: AppointmentService
  ) {
    this.appointments$ = this.appointmentService.appointments$;
    this.currentMonth = new Date();
    this.selectedMonth = new Date();
  }

  ngOnInit() {
    this.generateCalendarDays();
    this.updateSelectedMonth();
    this.appointments$
      .pipe(
        map((appointments: Appointment[]) => {
          return appointments;
        })
      )
      .subscribe();
  }

  changeMonth(direction: number) {
    this.currentMonth.setMonth(this.currentMonth.getMonth() + direction);
    this.generateCalendarDays();
    this.updateSelectedMonth();
  }

  generateCalendarDays() {
    const firstDay = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth(), 1);
    const lastDay = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 0);
    this.calendarDays = [];

    for (let d = firstDay; d <= lastDay; d.setDate(d.getDate() + 1)) {
      this.calendarDays.push(new Date(d));
    }
  }

  updateSelectedMonth() {
    this.selectedMonth = new Date(this.currentMonth);
  }

  openAppointmentForm() {
    const dialogRef = this.dialog.open(AppointmentFormComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.appointmentService.addAppointment(result);
      }
    });
  }

  deleteAppointment(id: string) {
    this.appointmentService.deleteAppointment(id);
  }

  drop(event: CdkDragDrop<Date, Date, string>) {
    this.appointmentService.moveAppointment(event);
  }
}
