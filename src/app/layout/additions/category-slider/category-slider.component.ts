import { Component, OnInit } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ProductsService } from '../../../shared/services/products/products.service';
import { error } from 'console';
import { Category } from '../../../shared/interfaces/products_interface';

@Component({
  selector: 'app-category-slider',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './category-slider.component.html',
  styleUrl: './category-slider.component.scss'
})
export class CategorySliderComponent implements OnInit {
  isloading:boolean =false;
  category_list!:Category[]
  ngOnInit(): void {
    this.isloading = true;
    this._ProductsService.getCategories().subscribe({
      next:(res)=>{
        this.isloading = false;
this.category_list  =res.data
      },
      error:(error)=>{
        console.log(error)
        this.isloading = false
      }
    });
  }
  constructor(public _ProductsService:ProductsService){}
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
    nav: false
  }
}
