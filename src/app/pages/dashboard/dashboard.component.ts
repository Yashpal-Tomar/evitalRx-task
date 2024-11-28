import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  searchForm: FormGroup;
  medicines: any[] = [];
  loading = false;
  errorMessage: string | null = null;

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private cartService: CartService
  ) {
    this.searchForm = this.fb.group({
      query: [''],
    });
  }

  ngOnInit(): void {
    this.setupSearch();
  }

  setupSearch() {
    this.searchForm
      .get('query')
      ?.valueChanges.pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((query: string) => {
        if (query.length >= 3) {
          this.fetchMedicines(query);
        } else {
          this.medicines = [];
        }
      });
  }

  fetchMedicines(query: string) {
    this.loading = true;
    this.errorMessage = null;
    const payload = { searchstring: query };
    this.apiService.post(environment.MEDICIENS_SEARCH, payload).subscribe({
      next: (response) => {
        if (!response.is_error) {
          this.medicines = response.data.result || [];
        } else {
          this.errorMessage = response.message || 'An error occurred.';
        }
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Error fetching medicines. Please try again.';
        this.loading = false;
      },
    });
  }

  addToCart(medicine: any) {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');

    const existingItemIndex = cart.findIndex(
      (item: any) => item.medicine_id === medicine.medicine_id
    );

    if (existingItemIndex > -1) {
      cart[existingItemIndex].quantity += 1;
      alert(
        `Quantity of ${cart[existingItemIndex].medicine_name} updated to ${cart[existingItemIndex].quantity}!`
      );
    } else {
      medicine.quantity = 1;
      cart.push(medicine);
      alert(`${medicine.medicine_name} added to cart!`);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    this.cartService.addToCart(cart);
  }
}
