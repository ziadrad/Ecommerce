import { animate, style, transition, trigger } from '@angular/animations';
import { isPlatformBrowser, NgOptimizedImage } from '@angular/common';
import { Component, Inject, Input, input, OnInit, PLATFORM_ID, ViewChild, viewChild } from '@angular/core';
import { Product } from '../../../shared/interfaces/products_interface';
import { ProductsService } from '../../../shared/services/products/products.service';
import { Router } from '@angular/router';
import { SearchComponent } from '../search/search.component';
import { SearchPipe } from '../../../shared/pips/search.pipe';
import { CartComponent } from '../../pages/cart/cart.component';
import { CartService } from '../../../shared/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { error } from 'console';
import { WishlistService } from '../../../shared/services/wishList/wishlist.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-product-row',
  standalone: true,
  imports: [SearchPipe,NgOptimizedImage,NgxSpinnerModule
  ],
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
  imgLoad:boolean = false;
@Input() userWord:string = '';
  errormsg: string = '';
 @Input() isloading: boolean = true;
current_page!:string|null;
WishList:String[]=[]

  constructor(
    @Inject(PLATFORM_ID) private id: object,
   
    public _ProductsService: ProductsService,
    private _CartService:CartService,
    private toester:ToastrService,
    private _NgxSpinnerService:NgxSpinnerService,
    private _router: Router,
    private _WishlistService:WishlistService
  ) {
    this.imgLoad = false;
    if (isPlatformBrowser(id)) {
      localStorage.setItem('current_page', '/products');
    }
  }
  ngOnInit(): void {

    // this to check if products is in session storage
      this.productFetch(1);
      this._WishlistService.GetWishList().subscribe({
        next:(res)=>{
for (let i = 0; i < res.data.length; i++) {
this.WishList.push(res.data[i].id)  
}        }
      })
      
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
        this._NgxSpinnerService.hide()
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

  //this function is used to Add product to cart

  addProductToCart(id:string,e:any){
    let  html:string = ` <i class="fa fa-spinner fa-spin"></i>`
        e.srcElement.innerHTML = html
    this._CartService.AddProductToCart(id).subscribe({
      next:(res)=>{
        this._CartService.cartListquantity.next(res.numOfCartItems)
        this.toester.success(res.message,"",{positionClass:'toast-bottom-right'});
        let  html:string = ` <i class="fa-solid fa-add"></i> Add to Cart`
        e.srcElement.innerHTML = html
      },
      error:(error)=>{
        this.toester.error('Error Happend ',"",{positionClass:'toast-bottom-right'});

      }
    })
    }

  addtoWishList(id:string){
    this._NgxSpinnerService.show()

this._WishlistService.AddProductToWishList(id).subscribe({
  next:(res)=>{
  this.WishList = res.data;
  this.isloading =false;
    this.toester.success(res.message,"",{positionClass:'toast-bottom-right'});
    this._NgxSpinnerService.hide()
  },
  error:(error)=>{
    this._NgxSpinnerService.hide()

    this.toester.error(error.error.message,"",{positionClass:'toast-bottom-right'});

  }
})
    }
    removeFromWishList(id:string){
      this._NgxSpinnerService.show()
      this._WishlistService.RemoveProductToWishList(id).subscribe({
        next:(res)=>{
          this._NgxSpinnerService.hide()
          this.isloading =false
          this.toester.success(res.message,"",{positionClass:'toast-bottom-right'});
          this.WishList = res.data
        },
          error:(error)=>{
            this._NgxSpinnerService.hide()
    this.toester.error(error.error.message,"",{positionClass:'toast-bottom-right'});

  }
      })
    }
}
