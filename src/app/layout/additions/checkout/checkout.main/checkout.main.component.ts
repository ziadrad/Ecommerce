import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormControlName, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { checkoutRes, ShippingAddress } from '../../../../shared/interfaces/checkout_interface';
import { CheckoutService } from '../../../../shared/services/checkout/checkout.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CartService } from '../../../../shared/services/cart/cart.service';

@Component({
  selector: 'app-checkout.main',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass],
  templateUrl: './checkout.main.component.html',
  styleUrl: './checkout.main.component.scss'
})
export class CheckoutMainComponent {
  constructor(private _CheckoutService:CheckoutService,private _ActivatedRoute:ActivatedRoute ,private _Router:Router, private _Cart:CartService){}
errmsg:string = '';
radiovalue:string = 'cash'
checkoutForm:FormGroup = new FormGroup({
  details: new FormControl(null,[Validators.required]),
  phone: new FormControl(null,[Validators.required ,  Validators.pattern(/^01[0125][0-9]{8}$/),]),
  city: new FormControl(null,[Validators.required])
})

isloading:boolean = false;

submitcheckout() {
  this._ActivatedRoute.paramMap.subscribe({
    next:p=>{
      if (this.radiovalue === 'cash') {
        this.cash_checkout(p.get('cartid')!);
      }else{
        this.card_checkout(p.get('cartid')!)
      }
    }
  })



}
changeRadioValue(e:any){
  this.radiovalue = e.target.value;
}

cash_checkout(id:string){
  this.isloading = true
  this._CheckoutService.creatCashOrder(this.checkoutForm.value,id).subscribe({
    next:(res)=>{
      this._Cart.cartListquantity.next(0);
      this._Router.navigate(['/allorders'])
      this.isloading = false
      console.log(res.data);
      
    },
    error:error=>{
      console.log(error)
    }
  })
}

card_checkout(id:string){
  this.isloading = true;
  this._CheckoutService.creatVisaOrder(this.checkoutForm.value,id).subscribe({
    next:(res)=>{
      this.isloading = false
    if(typeof(localStorage) != 'undefined'){
      window.open(res.session.url,'_Self')
    }
    },
    error:error=>{
      this.isloading = false
      console.log(error)
    }
  })
}

}
