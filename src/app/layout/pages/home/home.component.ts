import { isPlatformBrowser } from '@angular/common';
import {  Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ProducsComponent } from "../products/products.component";
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CategorySliderComponent } from "../../additions/category-slider/category-slider.component";
import { ProductRowComponent } from "../../additions/product-row/product-row.component";
import { AllordersComponent } from "../../additions/allorders/allorders.component";
import { ProductsService } from '../../../shared/services/products/products.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProducsComponent, CarouselModule, CategorySliderComponent, ProductRowComponent, AllordersComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  constructor(@Inject(PLATFORM_ID) private page_id:object,public _ProductsService:ProductsService)
  {    
  }
  ngOnInit(): void {
    console.log(isPlatformBrowser(this.page_id))
    if (isPlatformBrowser(this.page_id)) {
            localStorage.setItem("current_page",'/home')
          }
  }
  customOptions: OwlOptions = {
 
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
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
    nav: true
  }

  
}
