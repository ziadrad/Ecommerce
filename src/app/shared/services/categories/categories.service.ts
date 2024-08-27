import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../../interfaces/cart_interface';
import { categoriesRes, specificCategoryRes } from '../../interfaces/data';
import { Environment } from '../../../base/Environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private _http:HttpClient) { }

  getCategories():Observable<categoriesRes>{
    return this._http.get<categoriesRes>(`${Environment.baseUrl}/api/v1/categories`)
  }
  getSpeceficCategories(id:string):Observable<specificCategoryRes>{
    return this._http.get<specificCategoryRes>(`${Environment.baseUrl}/api/v1/categories/${id}`)
  }
}
