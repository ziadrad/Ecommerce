import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from '../../../base/Environment';
import { categoriesRes, specificCategoryRes } from '../../interfaces/data';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  constructor(private _http:HttpClient) { }

  getBrand():Observable<categoriesRes>{
    return this._http.get<categoriesRes>(`${Environment.baseUrl}/api/v1/brands`)
  }
  getSpeceficBrand(id:string):Observable<specificCategoryRes>{
    return this._http.get<specificCategoryRes>(`${Environment.baseUrl}/api/v1/brands/${id}`)
  }
}
