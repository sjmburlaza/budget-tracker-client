import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';
import { Router } from '@angular/router';
import { LoginInfo } from '../shared/models/user.model';
import { Store } from '@ngrx/store';
import { login } from '../state/actions/login.actions';
import { AuthState } from '../state/reducers/auth.reducer';

@Component({
  selector: 'bt-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form!: FormGroup<any>;
  isLoginSuccessful = false;
  errorMsg = '';
  submitClicked = false;

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    private fb: FormBuilder,
    private store: Store<AuthState>,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', 
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(32)
        ]
      ]
    });
  }

  // onSubmit(): void {
  //   this.submitClicked = true;

  //   if (this.form.invalid) {
  //     return;
  //   }
    
  //   const { email, password } = this.form.value;

  //   this.authService.emailExists(email).subscribe(res => {
  //     if (res) {
  //       this.isLoginSuccessful = true;
  //       this.login({ email, password });
  //     } else {
  //       this.errorMsg = 'Email does not exist.';
  //       this.isLoginSuccessful = false;
  //     }
  //   })

  //   this.submitClicked = false;
  // }

  onSubmit() {
    const { email, password } = this.form.value;

    this.store.dispatch(login({ email: email, password: password }));
    this.router.navigate(['/dashboard']);
  }

  // login(loginInfo: LoginInfo): void {
  //   if (!loginInfo) {
  //     return;
  //   }

  //   this.authService.login(loginInfo).subscribe( async response => {
  //     console.log('response', response)
  //     if (!response.error) {
  //       this.tokenStorage.saveToken(response.accessToken);
  //       this.tokenStorage.saveUser(response);
  //       await this.router.navigate(['/dashboard']);
  //       // window.location.reload();
  //     } else {
  //       this.isLoginSuccessful = false;
  //       this.errorMsg = response.error === 'incorrect-password' ? 'Incorrect password!' : response.error;
  //     }
  //   });
  // }

}
