import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';
import { PatientDialogComponent } from '../patient-dialog/patient-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  medicines: any[] = [];
  loading = false;
  errorMessage: string | null = null;
  patientId: any;
  patientDetails: any;

  constructor(
    private dialog: MatDialog,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchCartMedicines();
  }

  // Fetch medicines from local storage
  fetchCartMedicines(): void {
    const cart = localStorage.getItem('cart');
    this.medicines = cart ? JSON.parse(cart) : [];
  }

  selectPatient(): void {
    const dialogRef = this.dialog.open(PatientDialogComponent, {
      width: '700px',
      height: '90%',
    });

    dialogRef.afterClosed().subscribe((selectedPatient) => {
      if (selectedPatient) {
        this.apiService
          .post(environment.ADD_PATIENT, selectedPatient)
          .subscribe({
            next: (response) => {
              if (response.status_code === 1) {
                alert('Patient added successfully!');
                this.patientDetails = selectedPatient;
                this.patientId = response.data?.patient_id;
                dialogRef.close();
              } else {
                alert(
                  response.status_message +
                    ' Failed to add patient. Please try again.'
                );
              }
            },
            error: (error) => {
              console.error('Error adding patient:', error);
              alert('Error adding patient. Please try again later.');
            },
          });
      } else {
        alert('No patient selected.');
      }
    });
  }

  placeOrder() {
    const filteredMedicines = this.medicines.map(
      ({ medicine_id, quantity }) => ({ medicine_id, quantity })
    );
    const orderDetails = {
      items: filteredMedicines,
      delivery_type: 'delivery',
      patient_name: this.patientDetails.first_name
        ? this.patientDetails.first_name
        : this.patientDetails.firstname,
      mobile: this.patientDetails.mobile,
      address: 'Limbodi Indore',
      city: 'Indore',
      state: 'Madhya Pradesh',
      zipcode: this.patientDetails.zipcode,
      auto_assign: '',
      latitude: '12.970612',
      longitude: '77.6382433',
      chemist_id: 'pFSLzbwQTH8LY23N2IlczQ==',
    };
    this.apiService.post(environment.PLACE_ORDER, orderDetails).subscribe({
      next: (response) => {
        if (response.status_code == 0) {
          alert(response.status_message);
        } else if (response.status_code == 1) {
          alert(response.status_message);
          localStorage.removeItem('cart');
          this.router.navigate(['/dashboard']);
        }
      },
      error: () => {
        alert('Error placing order. Please try again.');
      },
    });
  }
}
