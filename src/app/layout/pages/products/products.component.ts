import { isPlatformBrowser, NgForOf } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ProductsService } from '../../../shared/services/products/products.service';
import {
  Product,
} from '../../../shared/interfaces/products_interface';
import { NgxPaginationModule } from 'ngx-pagination';
import { Router } from '@angular/router';
import {
  animate,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { SearchComponent } from '../../additions/search/search.component';
import { ProductRowComponent } from "../../additions/product-row/product-row.component";
import { CartService } from '../../../shared/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NgxPaginationModule, NgForOf, SearchComponent, ProductRowComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
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
export class ProducsComponent implements OnInit {
  products_state: 'open' | 'closed' = 'open';
list!:Product[];
UserWord:string = '';
  errormsg: string = '';
  isloading: boolean = true;
current_page!:string|null;

  constructor(
    @Inject(PLATFORM_ID) private id: object,
   private _CartService:CartService,
   private toster:ToastrService,
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

  pageChangeEvent(event: number) {
    if (isPlatformBrowser(this.id)) {
      //this function to scroll to top when pagination activated
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }

    this.productFetch(event);
  }

  //this function is used to fetch product from api
  productFetch(p: number) {
    this.isloading = true;
    this._ProductsService.getProducts(p).subscribe({
      next: (res) => {
        this.isloading = false
        this._ProductsService.product_List = res.data;
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
  reciveUserWord(event:string){
this.UserWord = event;
  }
 
 
}
