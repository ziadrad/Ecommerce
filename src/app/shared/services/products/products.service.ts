import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../../../base/Environment';
import { Observable } from 'rxjs';
import { Metadata } from '../../interfaces/products_interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {



  constructor(private _httpClient: HttpClient) { 

   
  }

  getProducts(page: number):Observable<any>{
    return this._httpClient.get(Environment.baseUrl+'/api/v1/products?page=' + page);
  }

  getProduct_details(id: string|null):Observable<any>{
    return this._httpClient.get(Environment.baseUrl+'/api/v1/products/' + id);
  }
  
}
