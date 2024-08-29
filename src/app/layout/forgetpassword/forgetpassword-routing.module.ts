import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgetPasswordMainComponent } from '../additions/forget_password/forget-password-main/forget-password-main.component';

const routes: Routes = [
  {path:'',pathMatch:'full',redirectTo:'ForgetPassword'
    
  },
  {path:"ForgetPassword",component:ForgetPasswordMainComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForgetpasswordRoutingModule { 
  
}
