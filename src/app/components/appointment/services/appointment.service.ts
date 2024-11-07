import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Appointment } from '../models/appointment.interface';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private appointments = new BehaviorSubject<Appointment[]>([]);
  appointments$ = this.appointments.asObservable();

  addAppointment(appointment: Appointment) {
    const current = this.appointments.getValue();
    this.appointments.next([
      ...current,
      {
        ...appointment,
        id: Date.now().toString(),
      },
    ]);
  }

  deleteAppointment(id: string) {
    const current = this.appointments.getValue();
    this.appointments.next(current.filter((app) => app.id !== id));
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
}
