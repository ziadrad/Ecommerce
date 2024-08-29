import { isPlatformBrowser, NgClass } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../../shared/services/auth/auth.service';
import { CodeCheckComponent } from "../code-check/code-check.component";
import { animate, style, transition, trigger } from '@angular/animations';
import {  NgxToastNotifyService } from 'ngx-toast-notify';

@Component({
  selector: 'app-forget-password-main',
  standalone: true,
  imports: [NgClass, ReactiveFormsModule, CodeCheckComponent],
  templateUrl: './forget-password-main.component.html',
  styleUrl: './forget-password-main.component.scss', 
  animations: [
    trigger('openclose', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s ease-in', style({ opacity: 1 })),
      ]),

      
    ]),
  ],
  
})
export class ForgetPasswordMainComponent {
  reset_code:boolean = false;
  isloading: boolean = false;
  errmsg!: string;

  constructor(
    private _AuthService: AuthService,
    @Inject(PLATFORM_ID) private Id: Object,
   private toust:NgxToastNotifyService
  ) {}
  EmailForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });

  //this function to make to Fetch login data of user to server
  CallForgetPassword() {
    this.isloading = true;
    this._AuthService.ForgetPassword(this.EmailForm.value).subscribe({
      next: (res) => {
        this.toust.showToast("send reset code successfully", "success", "bottom-center");
        this.isloading = false;
        if (isPlatformBrowser(this.Id)) {
          sessionStorage.setItem("email",this.EmailForm.get('email')?.value)
        }
        this.reset_code = true;
      },
      error: (error) => {
        this.isloading = false
        this.errmsg = error.error.message;
      },
    });
  }
}
