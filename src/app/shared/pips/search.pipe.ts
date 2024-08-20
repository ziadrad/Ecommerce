import { Pipe, PipeTransform } from '@angular/core';
import { Product, product_List } from '../interfaces/products_interface';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(products: Product[],userWord:string): Product[] {
     return products?.filter((product)=> product.title?.toLowerCase().includes(userWord?.toLowerCase()) ||product.description?.toLowerCase().includes(userWord?.toLowerCase())||product.brand.name?.toLowerCase().includes(userWord?.toLowerCase()));
  }

}
