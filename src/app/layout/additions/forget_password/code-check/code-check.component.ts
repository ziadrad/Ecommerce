import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../../shared/services/auth/auth.service';
import { NgClass } from '@angular/common';
import { NewpasswordComponent } from "../newpassword/newpassword.component";
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-code-check',
  standalone: true,
  imports: [NgClass, ReactiveFormsModule, NewpasswordComponent],
  templateUrl: './code-check.component.html',
  styleUrl: './code-check.component.scss',
  animations: [
    trigger('openclose', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s ease-in', style({ opacity: 1 })),
      ]),

      
    ]),
  ],
})
export class CodeCheckComponent {
  newPassword:boolean = false;
  isloading: boolean = false;
  errmsg!: string;

  constructor(
    private _AuthService: AuthService,
    @Inject(PLATFORM_ID) private Id: Object
  ) {}
  CodeForm: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]{4,}$/)]),
  });

  //this function to make to Fetch login data of user to server
  VerifyResetCode() {
    this.isloading = true;
    this._AuthService.VerifyResetPassword(this.CodeForm.value).subscribe({
      next: (res) => {
        this.isloading = false;
        this.newPassword = true
      },
      error: (error) => {
        this.isloading = false
        this.errmsg = error.error.message;
      },
    });
  }
}
