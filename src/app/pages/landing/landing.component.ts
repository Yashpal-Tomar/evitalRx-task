import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent {

  cartCount: number = 0;
  
  constructor(private router: Router, private cartService: CartService) {}
  ngOnInit(): void {
    this.cartService.cartCount$.subscribe((count) => {
      this.cartCount = count;
    });
  }

  updateCartCount(): void {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    this.cartCount = cart.length;
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
