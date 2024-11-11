import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatNativeDateModule } from '@angular/material/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrl: './appointment-form.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatDialogModule,
    MatCardModule,
    MatButtonModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatIconModule,
  ],
})
export class AppointmentFormComponent implements OnDestroy {
  appointmentForm: FormGroup;
  private subscription: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AppointmentFormComponent>
  ) {
    this.appointmentForm = this.fb.group({
      title: ['', [Validators.required]],
      date: ['', [Validators.required]],
      description: [''],
    });

    this.subscription.add(
      this.appointmentForm.valueChanges.subscribe(value => {
        console.log('Form changes:', value);
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit() {
    if (this.appointmentForm.valid) {
      this.dialogRef.close(this.appointmentForm.value);
    }
  }
}
