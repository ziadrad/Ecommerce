import { Component, DoCheck, OnChanges, SimpleChanges } from '@angular/core';
import { ProductsService } from '../../../shared/services/products/products.service';
import { BrowserModule } from '@angular/platform-browser';
import { title } from 'process';
import { Product } from '../../../shared/interfaces/products_interface';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent  {
  constructor(public _ProductsService:ProductsService){
    
  }
 

//this function work while searching in data

  search_products(event:any){
   let res=  this._ProductsService.product_List;
       let list= res.filter((product)=> product.title.toLowerCase().includes(event.target.value.toLowerCase()) ||product.description.toLowerCase().includes(event.target.value.toLowerCase())||product.brand.name.toLowerCase().includes(event.target.value.toLowerCase()));

// to change productlist
this._ProductsService.product_List = list;
  }

//this function work on removing data
onremove(e:any){
  // to reset productlist to its value
  this._ProductsService.product_List=this._ProductsService.product_list_copy;
  this.search_products(e)
}

}
