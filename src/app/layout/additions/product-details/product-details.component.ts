import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { log } from 'console';
import { ProductsService } from '../../../shared/services/products/products.service';
import { Product } from '../../../shared/interfaces/products_interface';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  poduct!: Product ;
  isloading: boolean = true;


  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _router: Router,
    public _ProductsService: ProductsService
  )
  {
    
   
  }

  id: string | null = this._ActivatedRoute.snapshot.paramMap.get('id');

  ngOnInit(): void {
  
    this.productDetaisFetch(this.id);
  }

  productDetaisFetch(id: string|null) {
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
}
