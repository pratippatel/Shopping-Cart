import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Notyf } from 'notyf';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  @ViewChild('loginTab') loginTab: any;
  @ViewChild('titleText') titleText: any;
  loginForm: any;
  signUpForm: any;
  notif = new Notyf();

  constructor(
    private formBuilder: FormBuilder,
    private http: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    this.signUpForm = this.formBuilder.group(
      {
        username: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      { validator: this.passwordConfirming }
    );
  }

  passwordConfirming(c: any): { invalid: boolean } | void {
    if (c.get('password').value !== c.get('confirmPassword').value) {
      return { invalid: true };
    }
  }

  onLogin() {
    console.log('login');
    console.log(this.loginForm.valid);
    console.log(this.loginForm.value);
    this.http.login(this.loginForm.value).subscribe((res: any) => {
      console.log({ res });
      if (res?.token) {
        this.http.saveToken(res?.token);
        this.http.saveUserInfo(res?.user);
        this.notif.success('Login successful !!');
        this.router.navigate(['/']);
      } else {
        this.notif.error('Login failed !!');
      }
    });
  }

  onSignUp() {
    console.log('signup');
    console.log(this.signUpForm.value);
    const payload = new FormData();
    payload.append('username', this.usernameS.value);
    payload.append('password', this.passwordS.value);
    console.log({ payload });
    console.log(this.usernameS.value);

    this.http.signUp(payload).subscribe((res: any) => {
      if (res?.token) {
        this.http.saveToken(res?.token);
        this.http.saveUserInfo(res?.user);
        this.notif.success('SingUp successful !!');
        this.router.navigate(['/']);
      } else {
        this.notif.error('SingUp failed !!');
      }
    });
  }

  onLoginSlide() {
    this.loginTab.nativeElement.style.marginLeft = '0%';
    this.titleText.nativeElement.style.marginLeft = '0%';
  }

  onSignUpSlide() {
    this.loginTab.nativeElement.style.marginLeft = '-50%';
    this.titleText.nativeElement.style.marginLeft = '-100%';
  }

  get usernameL() {
    return this.loginForm.get('username');
  }

  get passwordL() {
    return this.loginForm.get('password');
  }

  get usernameS() {
    return this.signUpForm.get('username');
  }

  get passwordS() {
    return this.signUpForm.get('password');
  }

  get confirmPasswordS() {
    return this.signUpForm.get('confirmPassword');
  }

  onConfirmChange(event: any) {
    console.log({ change: this.signUpForm });
  }
}
