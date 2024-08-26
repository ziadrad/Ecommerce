import { Component, OnInit } from '@angular/core';
import { CheckoutService } from '../../../shared/services/checkout/checkout.service';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { error } from 'console';
import { checkoutRes, receipt } from '../../../shared/interfaces/checkout_interface';
import { CurrencyPipe, NgClass } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [CurrencyPipe,NgClass],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss',
  animations:[ trigger('open', [
    transition(':enter', [
      style({ opacity: 0 }),
      animate('0.75s ease-in', style({ opacity: 1 })),
    ]),

  ]),
  trigger('close', [
    transition(':leave', [
      style({ opacity: 1 }),
      animate('0.5s ease-in', style({ opacity: 0 })),
    ]),

  ]),]
})
export class AllordersComponent implements OnInit {
constructor(private _CheckoutService:CheckoutService,private _AuthService:AuthService){
}
isloading:boolean = false;
ordersList!:receipt[]
ngOnInit(): void {
  this.getAllOrders()
}
getAllOrders(){
  this.isloading = true
this._CheckoutService.getAllUserOrders(this._AuthService.userData.getValue().id).subscribe({
  next:res=>{
    this.ordersList = res
    this.isloading = false
  },
  error:error=>{
    console.log(error)
  }
})

}

}
