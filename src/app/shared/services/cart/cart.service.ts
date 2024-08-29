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
    
   }

  getCart():Observable<cartRes>{
    return this.__httpClient.get<cartRes>(Environment.baseUrl+'/api/v1/cart',{
    });
  }

  AddProductToCart(productId:string):Observable<AddproductRes>{
    return this.__httpClient.post<AddproductRes>(Environment.baseUrl+'/api/v1/cart',{productId:productId},{
    });
  }
  
  RemoveProductFromCart(productId:string):Observable<cartRes>{
    return this.__httpClient.delete<cartRes>(Environment.baseUrl+`/api/v1/cart/${productId}`,{
    });
  }

 DeletCart():Observable<any>{
    return this.__httpClient.delete<any>(Environment.baseUrl+`/api/v1/cart/`,{
    });
  }

  updatProductQuantity(quantity:string,productId:string):Observable<cartRes>{
    return this.__httpClient.put<cartRes>(Environment.baseUrl+`/api/v1/cart/${productId}`,{count:quantity},{
    });
  }

}
