import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Appointment } from '../models/appointment.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private appointments = new BehaviorSubject<Appointment[]>([]);
  appointments$ = this.appointments.asObservable();

  addAppointment(appointment: Appointment) {
    const newAppointment = {
      ...appointment,
      id: Date.now().toString(),
    };
    this.appointments.next([...this.appointments.getValue(), newAppointment]);
  }

  deleteAppointment(id: string) {
    this.appointments.next(this.appointments.getValue().filter((app) => app.id !== id));
  }

  moveAppointment(event: CdkDragDrop<Date>) {
    const current = this.appointments.getValue();
    const appointment = event.item.data;
    const newDate = event.container.data;

    const updated = current.map((app) => {
      if (app.id === appointment.id) {
        return { ...app, date: newDate };
      }
      return app;
    });

    this.appointments.next(updated);
  }

  getAppointmentsByDate(date: Date): Observable<Appointment[]> {
    return this.appointments$.pipe(
      map((appointments) =>
        appointments.filter((app) => app.date.toDateString() === date.toDateString())
      )
    );
  }
}
