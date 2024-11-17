import { CommonModule } from '@angular/common';
import { Component, OnDestroy, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.scss'],
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
  isFormValid$: Observable<boolean>;
  private subscription: Subscription = new Subscription();

  constructor(
    @Inject(FormBuilder) private fb: FormBuilder,
    @Inject(MatDialogRef) private dialogRef: MatDialogRef<AppointmentFormComponent>
  ) {
    this.appointmentForm = this.fb.group({
      title: ['', [Validators.required]],
      date: ['', [Validators.required]],
      description: [''],
    });

    this.isFormValid$ = this.appointmentForm.statusChanges.pipe(
      startWith(this.appointmentForm.status),
      map((status) => status === 'VALID')
    );

    this.subscription.add(
      this.appointmentForm.valueChanges.subscribe((value) => {
        console.log('Form changes:', value);
      })
    );
  }

  onSubmit() {
    if (this.appointmentForm.valid) {
      this.dialogRef.close(this.appointmentForm.value);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
