import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../../../base/Environment';
import { Observable } from 'rxjs';
import { Category, Metadata, Product, product_List } from '../../interfaces/products_interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  product_List!: Product[];
  product_list_copy!:Product[];
  metadata: Metadata = {
    currentPage: 1,
    limit: 0,
    numberOfPages: 0,
    prevPage: 0,
  };

  constructor(private _httpClient: HttpClient) { 

   
  }

  getProducts(page: number):Observable<product_List>{
    return this._httpClient.get<product_List>(Environment.baseUrl+'/api/v1/products?page=' + page);
  }

  getProduct_details(id: string|null):Observable<any>{
    return this._httpClient.get(Environment.baseUrl+'/api/v1/products/' + id);
  }

  getCategories():Observable<any>{
    return this._httpClient.get<any>(Environment.baseUrl+'/api/v1/categories');
  }
  
}
