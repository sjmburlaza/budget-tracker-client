import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { confirmPasswordValidator } from '../shared/customValidators';
import { RegisterInfo } from '../shared/models/user.model';
import { first } from 'rxjs';

@Component({
  selector: 'bt-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form!: FormGroup<any>;
  isSignUpSuccessful = false;
  errorMsg = '';
  submitClicked = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(32),
        ]
      ],
      confirmPassword: ['', [Validators.required, confirmPasswordValidator()]]
    })
  }

  onSubmit(): void {
    this.submitClicked = true;

    if (this.form.invalid) {
      return;
    } else {
      const { firstName, lastName, email, password } = this.form.value;
  
      this.authService.emailExists(email)
        .pipe(first())
        .subscribe(res => {
          if (!res) {
            this.register({ firstName, lastName, email, password });
          } else {
            this.errorMsg = 'Email already exists.';
            this.isSignUpSuccessful = false;
          }
        })
    }
    this.submitClicked = false;
  }

  register(registerInfo: RegisterInfo): void {
    if (!registerInfo) {
      return;
    }

    this.authService.register(registerInfo)
      .pipe(first())
      .subscribe(res => {
        if (res) {
          this.isSignUpSuccessful = true;
          this.router.navigate(['/login']);
        } else {
          this.isSignUpSuccessful = false;
        }
      })
  }
}
