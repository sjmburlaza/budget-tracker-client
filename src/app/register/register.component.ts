import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  form: any = {
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    confirmPassword: null
  };
  
  isSuccessful = false;
  isSignUpFailed = false;
  passwordMatched = true;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  
  onSubmit(): void {
    const { firstName, lastName, email, password, confirmPassword } = this.form;
    if (password !== confirmPassword) {
      this.passwordMatched = false;
    } else {
      this.authService.emailExists(email).subscribe(data => {
        this.passwordMatched = true;

        if (!data || data === false) {
          this.authService.register(firstName, lastName, email, password).subscribe(
            data => {
              if (data) {
                this.isSuccessful = true;
                this.isSignUpFailed = false;
                this.router.navigate(['/login']);
              }
            },
            err => {
              this.errorMessage = err.error.message;
              this.isSignUpFailed = true;
            }
          );
        } else {
          this.errorMessage = 'Email already exists.';
          this.isSignUpFailed = true;
        }
      })
    }
  }
}