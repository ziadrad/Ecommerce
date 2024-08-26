import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Environment } from '../../../base/Environment';
import { Observable } from 'rxjs';
import { ADDtoWishListRes, wishListRes } from '../../interfaces/wishList_interface';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  UserToken:any = {}
  constructor(private __httpClient:HttpClient) {
    if (typeof document != 'undefined') {
      this.UserToken = {
        token :localStorage.getItem('User_Token')||''
      }
    }
    
   }

  GetWishList():Observable<wishListRes>{
  return  this.__httpClient.get<wishListRes>(`${Environment.baseUrl}/api/v1/wishlist`,{headers:this.UserToken})
  }

  AddProductToWishList(id:string):Observable<ADDtoWishListRes>{
  return  this.__httpClient.post<ADDtoWishListRes>(`${Environment.baseUrl}/api/v1/wishlist`,{productId:id},{headers:this.UserToken})
  }

  RemoveProductToWishList(id:string):Observable<ADDtoWishListRes>{
  return  this.__httpClient.delete<ADDtoWishListRes>(`${Environment.baseUrl}/api/v1/wishlist/${id}`,{headers:this.UserToken})
  }

}
