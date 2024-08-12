import { isPlatformBrowser, NgForOf } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ProductsService } from '../../../shared/services/products/products.service';
import { error } from 'console';
import {
  
  Metadata,
  Product,
} from '../../../shared/interfaces/products_interface';
import {
  NgxPaginationModule,
  PaginationControlsComponent,
  PaginationControlsDirective,
  PaginationService,
} from 'ngx-pagination';
import { NgModel } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-producs',
  standalone: true,
  imports: [NgxPaginationModule, NgForOf],
  templateUrl: './producs.component.html',
  styleUrl: './producs.component.scss',
})
export class ProducsComponent implements OnInit {
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
    public _ProductsService: ProductsService,private _router:Router
  ) {
    if (isPlatformBrowser(id)) {
      localStorage.setItem('current_page', '/products');
    }
  }
  ngOnInit(): void {
    if (this.product_List == null) {
      this.productFetch(1);
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
      },
      error: (error) => {
        //this function is error handling
        this.errormsg = error.error.message;
        this.isloading = false;
      },
    });
  }

  //this function is used to navigate to productdetails page and pass product id
  product_details_navigate(id:any){
    this._router.navigate(['/product_details',{id:id}])
  }
}
