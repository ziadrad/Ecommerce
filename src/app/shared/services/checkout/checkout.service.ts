import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { checkoutRes, CheckoutVisaRes, ShippingAddress } from '../../interfaces/checkout_interface';
import { Environment } from '../../../base/Environment';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  UserToken:any = {}
  constructor(private __httpClient:HttpClient,@Inject(PLATFORM_ID) private id:object) {
    if (typeof document != 'undefined') {
      this.UserToken = {
        token :localStorage.getItem('User_Token')||''
      }
    }
    
   }

   creatCashOrder( data : ShippingAddress , id:string) :Observable<checkoutRes>{
      return this.__httpClient.post<checkoutRes>(`${Environment.baseUrl}/api/v1/orders/${id}`,{shippingAddress:data},{headers:this.UserToken})
   }

getAllUserOrders(userId:string) :Observable<any>{
  return this.__httpClient.get<any>(`${Environment.baseUrl}/api/v1/orders/user/${userId}`)

}

   creatVisaOrder( data : ShippingAddress , id:string) :Observable<CheckoutVisaRes>{
      return this.__httpClient.post<CheckoutVisaRes>(`${Environment.baseUrl}/api/v1/orders/checkout-session/${id}?url=${Environment.Host}`,{shippingAddress:data},{headers:this.UserToken})
   }
}
