import {
  Component,
  Inject,
  inject,
  PLATFORM_ID,
  PlatformRef,
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { isPlatformBrowser, NgClass } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { routes } from '../../../app.routes';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass,RouterLink,RouterLinkActive],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  isloading: boolean = false;
  errmsg!: string;

  constructor(
    private _AuthService: AuthService,
    private _router: Router,
    @Inject(PLATFORM_ID) private Id: Object
  ) {}
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
  });

  //this function to submit Login for user
  submitlogin() {
    this.isloading = true;
    this.Fetchlogin();
  }

  //this function to make to Fetch login data of user to server
  Fetchlogin() {
    console.log(this.loginForm.value);
    this._AuthService.signin(this.loginForm.value).subscribe({
      next: (res) => {
        if (isPlatformBrowser(this.Id)) {
          localStorage.setItem('User_Token', res.token);

          this._AuthService.decod_UserData();
        }
        this._router.navigate(['/home']);
        this.isloading = false;
      },
      error: (error) => {
        this.errmsg = error.error.message;
        this.isloading = false;
      },
    });
  }

}
