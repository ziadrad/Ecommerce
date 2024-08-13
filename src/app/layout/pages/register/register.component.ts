import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { error } from 'console';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})

export class RegisterComponent {
  isloading: boolean = false;
  errmsg!: string;
  constructor(private _AuthService: AuthService, private _Router: Router) {}

  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[A-Z][a-z0-9]{8,}$/),
      ]),
      rePassword: new FormControl(null),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^01[0125][0-9]{8}$/),
      ]),
    },
    this.checkrepassword
  );

  //this function to make check on rePassword and make custom error
  checkrepassword(g: AbstractControl) {
    if (g.get('password')?.value === g.get('rePassword')?.value) {
      return null;
    } else {
      g.get('rePassword')?.setErrors({ missmatch: true });
      return { missmatch: true };
    }
  }

  //this function to submit the user data
  submitRegister() {
    this.isloading = true;
    this.Fetch_Register();
  }

  //this function to connect to api and send userdata to signup

  Fetch_Register() {
    this._AuthService.signup(this.registerForm.value).subscribe({
      next: (res) => {
        this._Router.navigate(['/login']);
        this.isloading = false;
      },
      error: (error) => {
        this.errmsg = error.error.message;
        this.isloading = false;
      },
    });
  }
}
