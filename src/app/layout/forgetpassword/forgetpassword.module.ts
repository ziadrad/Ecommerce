import { NgModule } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';

import { ForgetpasswordRoutingModule } from './forgetpassword-routing.module';
import { ForgetPasswordMainComponent } from '../additions/forget_password/forget-password-main/forget-password-main.component';
import { CodeCheckComponent } from '../additions/forget_password/code-check/code-check.component';
import { NewpasswordComponent } from '../additions/forget_password/newpassword/newpassword.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ForgetPasswordMainComponent,CodeCheckComponent,NewpasswordComponent
  ],
  imports: [
    CommonModule,
    ForgetpasswordRoutingModule,
    NgClass, ReactiveFormsModule

  ]
})
export class ForgetpasswordModule { }
