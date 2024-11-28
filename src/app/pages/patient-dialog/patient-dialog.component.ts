import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-patient-dialog',
  templateUrl: './patient-dialog.component.html',
  styleUrls: ['./patient-dialog.component.css'],
})
export class PatientDialogComponent {
  addPatientForm: FormGroup;
  searchResult: any = null;
  patients: any[] = [];
  showPatientForm: boolean = false;
  enteredId: any;
  selectedPatient: any;
  today: string = new Date().toISOString().split('T')[0];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PatientDialogComponent>,
    private apiService: ApiService
  ) {
    this.addPatientForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      blood_group: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      zipcode: ['', Validators.required],
    });
  }

  searchPatient(): void {
    this.apiService
      .post(environment.FETCH_PATIENT, { patient_id: this.enteredId })
      .subscribe({
        next: (response) => {
          this.selectedPatient = response.data[0];
        },
        error: () => {
          alert('Error fetching patient. Please try again.');
        },
      });
  }

  selectPatient(patient: any): void {
    this.dialogRef.close(patient); // Close and send the selected patient data
  }
  submitPatient(): void {
    if (this.addPatientForm.valid) {
      this.selectedPatient = this.addPatientForm.value;
      this.dialogRef.close(this.selectedPatient);
    }
  }
}
