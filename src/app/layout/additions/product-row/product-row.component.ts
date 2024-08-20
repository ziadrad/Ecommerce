import { animate, style, transition, trigger } from '@angular/animations';
import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, input, OnInit, PLATFORM_ID } from '@angular/core';
import { Product } from '../../../shared/interfaces/products_interface';
import { ProductsService } from '../../../shared/services/products/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-row',
  standalone: true,
  imports: [],
  templateUrl: './product-row.component.html',
  styleUrl: './product-row.component.scss',
   animations: [
    trigger('openclose', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.25s ease-in', style({ opacity: 1 })),
      ]),

      transition(':leave', [
        style({ opacity: 1 }),
        animate('0.25s ease-out', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class ProductRowComponent implements OnInit{
  products_state: 'open' | 'closed' = 'open';
list!:Product[];

  errormsg: string = '';
 @Input() isloading: boolean = true;
current_page!:string|null;

  constructor(
    @Inject(PLATFORM_ID) private id: object,
    public _ProductsService: ProductsService,
    private _router: Router
  ) {
    if (isPlatformBrowser(id)) {
      localStorage.setItem('current_page', '/products');
    }
  }
  ngOnInit(): void {
    // this to check if products is in session storage
      this.productFetch(1);
      
  }

  //this function is used to fetch product from api
  productFetch(p: number) {
    this.isloading = true;
    this._ProductsService.getProducts(p).subscribe({
      next: (res) => {
        console.log(res);
        this.isloading = false
        this._ProductsService.product_List = res.data;
        this._ProductsService.product_list_copy = res.data;
        this._ProductsService.metadata = res.metadata;
      },
      error: (error) => {
        //this function is error handling
        this.errormsg = error.error.message;
        this.isloading = false;
      },
    });
  }

  //this function is used to navigate to productdetails page and pass product id
  product_details_navigate(id: any) {
    this._router.navigate(['/product_details', { id: id }]);
  }
 
}
