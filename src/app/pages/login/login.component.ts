import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hidePassword = true;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private commonService: CommonService
  ) {
    this.loginForm = this.fb.group({
      mobnob: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {
    const isLoggedIn = !!this.commonService.getLocalStorageValue('user');
    if (isLoggedIn) {
      this.router.navigate(['/dashboard']);
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const userCred = this.loginForm.value;
      const response = {
        user: userCred,
      };
      this.commonService.setLocalStorageValue('user', response.user);
      this.router.navigate(['/dashboard']);
    }
  }

  allowNumbersOnly(event: KeyboardEvent) {
    const charCode = event.key.charCodeAt(0);
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }
}
