import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DragDropModule, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
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

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
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
    AppointmentFormComponent,
  ],
})
export class CalendarComponent implements OnInit {
  weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  calendarDays: Date[] = [];
  appointments$: Observable<Appointment[]>;

  constructor(
    private dialog: MatDialog,
    private appointmentService: AppointmentService
  ) {
    this.appointments$ = this.appointmentService.appointments$;
  }

  ngOnInit() {
    this.generateCalendarDays();
  }

  generateCalendarDays() {
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    for (let d = firstDay; d <= lastDay; d.setDate(d.getDate() + 1)) {
      this.calendarDays.push(new Date(d));
    }
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

  drop(event: CdkDragDrop<[]>) {
    const previousIndex = this.calendarDays.findIndex((d) => d === event.item.data);
    moveItemInArray(this.calendarDays, previousIndex, event.currentIndex);
  }
}
