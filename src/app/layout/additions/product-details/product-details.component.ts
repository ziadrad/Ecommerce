import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { log } from 'console';
import { ProductsService } from '../../../shared/services/products/products.service';
import { Product } from '../../../shared/interfaces/products_interface';
import { isPlatformBrowser } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

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
  poduct!: Product ;
  isloading: boolean = true;


  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _router: Router,
    @Inject(PLATFORM_ID) private platform_id:object,
    public _ProductsService: ProductsService){}

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
  go_Products(){
    this._router.navigate(['/products'])
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }

}
