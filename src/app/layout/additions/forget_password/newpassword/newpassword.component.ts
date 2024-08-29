import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../../shared/services/auth/auth.service';
import { isPlatformBrowser, NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-newpassword',
  templateUrl: './newpassword.component.html',
  styleUrl: './newpassword.component.scss',
  animations: [
    trigger('openclose', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s ease-in', style({ opacity: 1 })),
      ]),

      
    ]),
  ],
})
export class NewpasswordComponent implements OnInit{
  isloading: boolean = false;
  errmsg!: string;
email!:string;
  constructor(
    private _AuthService: AuthService,
    private _router:Router,
    @Inject(PLATFORM_ID) private Id: Object
  ) {
  
  }
  ngOnInit(): void {
    if (isPlatformBrowser(this.Id)) {
      this.email = sessionStorage.getItem("email")!.toString();
     
      }
  }
  NewPasswordForm: FormGroup = new FormGroup({
    email: new FormControl(sessionStorage.getItem("email")!.toString(), [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-Z][a-z0-9]{8,}$/),
    ]),  });

  //this function to make to Fetch login data of user to server
  resetPassword() {
    this.isloading = true;
    this._AuthService.resetPassword(this.NewPasswordForm.value).subscribe({
      next: (res) => {
        this.isloading = false;
        if(isPlatformBrowser(this.Id)){
          localStorage.setItem('User_Token',res.token);
        this._AuthService.decod_UserData();
        this._router.navigate(['/home'])
        }
      },
      error: (error) => {
        this.isloading = false
        this.errmsg = error.error.message;
      },
    });
  }
}
