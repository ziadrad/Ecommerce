import { CommonModule, isPlatformBrowser, NgForOf } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ProductsService } from '../../../shared/services/products/products.service';
import {
  Metadata,
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

@Component({
  selector: 'app-producs',
  standalone: true,
  imports: [NgxPaginationModule, NgForOf, CommonModule],
  templateUrl: './producs.component.html',
  styleUrl: './producs.component.scss',
  animations: [
    trigger('openclose', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s ease-in', style({ opacity: 1 })),
      ]),

      transition(':leave', [
        style({ opacity: 1 }),
        animate('1s ease-out', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class ProducsComponent implements OnInit {
  products_state: 'open' | 'closed' = 'open';
  product_List!: Product[];
  errormsg: string = '';
  isloading: boolean = true;
  metadata: Metadata = {
    currentPage: 1,
    limit: 0,
    numberOfPages: 0,
    prevPage: 0,
  };

  constructor(
    @Inject(PLATFORM_ID) private id: object,
    public _ProductsService: ProductsService,
    private _router: Router
  ) {
    if (isPlatformBrowser(id)) {
      localStorage.setItem('current_page', '/products');
      this.product_List = JSON.parse(
        sessionStorage.getItem('products') || '{}'
      );
      this.metadata = JSON.parse(sessionStorage.getItem('meta_data') || '{}');
    }
  }
  ngOnInit(): void {
    // this to check if products is in session storage
    if (sessionStorage.getItem('products') == null) {
      this.productFetch(1);
    } else {
      this.isloading = false;
    }
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
    this.product_List = [];
    this.isloading = true;
    this._ProductsService.getProducts(p).subscribe({
      next: (res) => {
        console.log(res);
        this.isloading = false;
        this.product_List = res.data;
        this.metadata = res.metadata;
        if (isPlatformBrowser(this.id)) {
          // this to save products  in session storage
          sessionStorage.setItem('products', JSON.stringify(this.product_List));
          sessionStorage.setItem('meta_data', JSON.stringify(this.metadata));
        }
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
  show: Boolean = true;
  sdadsdas() {
    this.show = false;
  }
}
