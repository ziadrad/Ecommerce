import { HttpClient } from '@angular/common/http';
import { afterNextRender, Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Environment } from '../../../base/Environment';
import { AddproductRes, cartRes, Data } from '../../interfaces/cart_interface';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartListquantity = new BehaviorSubject<Number>(0)
  UserToken:any = {}
  constructor(private __httpClient:HttpClient,@Inject(PLATFORM_ID) private id:object) {
    if (isPlatformBrowser(id)) {
      this.UserToken = {
        token :localStorage.getItem('User_Token')||''
      }
    }
    
   }

  getCart():Observable<cartRes>{
    return this.__httpClient.get<cartRes>(Environment.baseUrl+'/api/v1/cart',{
      headers: this.UserToken
    });
  }

  AddProductToCart(productId:string):Observable<AddproductRes>{
    return this.__httpClient.post<AddproductRes>(Environment.baseUrl+'/api/v1/cart',{productId:productId},{
      headers: this.UserToken
    });
  }
  
  RemoveProductFromCart(productId:string):Observable<cartRes>{
    return this.__httpClient.delete<cartRes>(Environment.baseUrl+`/api/v1/cart/${productId}`,{
      headers: this.UserToken
    });
  }

 DeletCart():Observable<any>{
    return this.__httpClient.delete<any>(Environment.baseUrl+`/api/v1/cart/`,{
      headers: this.UserToken
    });
  }

  updatProductQuantity(quantity:string,productId:string):Observable<cartRes>{
    return this.__httpClient.put<cartRes>(Environment.baseUrl+`/api/v1/cart/${productId}`,{count:quantity},{
      headers: this.UserToken
    });
  }

}
