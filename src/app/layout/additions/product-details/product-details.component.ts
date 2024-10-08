import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { log } from 'console';
import { ProductsService } from '../../../shared/services/products/products.service';
import { Product } from '../../../shared/interfaces/products_interface';
import { isPlatformBrowser, Location } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CartService } from '../../../shared/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
  animations: [
    trigger('openclose',[
     transition(':enter',[style({opacity:0}),animate('1s ease-in',style({ opacity:1}))]),
     
     transition(':leave',[style({opacity:1}),animate('1s ease-in',style({opacity:0}))]),
    ]),
   ]
})

export class ProductDetailsComponent implements OnInit {
  customOptions: OwlOptions = {
 
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    autoplay:true,
    autoplayTimeout:4000,
    autoplaySpeed:700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
    },
    nav: false
  }
  poduct!: Product ;
  isloading: boolean = true;
  addingtocart:boolean = false;


  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _router: Router,
    private _location: Location,
    @Inject(PLATFORM_ID) private platform_id:object,
    
    public _ProductsService: ProductsService,private _CartService:CartService,private toester:ToastrService){}

  id: string | null = this._ActivatedRoute.snapshot.paramMap.get('id');
  ngOnInit(): void {
    this.productDetailsFetch(this.id);
    

  }


  //function to fetch products details;
  productDetailsFetch(id: string|null) {
    this._ProductsService.getProduct_details(id).subscribe({
      next: (res) => {
        console.log(res);
        this.poduct = res.data 
        this.isloading = false;
      },
      error: (error) => {
        //this function is error handling
        this.isloading = false;
      },
    });
  }

  
  go_Back(){
  
    this._location.back();
  }

  addProductToCart(id:string){
    this.addingtocart = true;
    this._CartService.AddProductToCart(id).subscribe({
      next:(res)=>{
        this.addingtocart = false;
        this._CartService.cartListquantity.next(res.numOfCartItems)
        this.toester.success(res.message,"",{positionClass:'toast-bottom-right'});
      },
      error:(error)=>{
        this.toester.error('Error Happend ',"",{positionClass:'toast-bottom-right'});

      }
    })
      }

}
