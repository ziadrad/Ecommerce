import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../../shared/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { WishlistService } from '../../../../shared/services/wishList/wishlist.service';
import { product } from '../../../../shared/interfaces/wishList_interface';
import { trigger, transition, style, animate } from '@angular/animations';
import { Coords } from 'ngx-owl-carousel-o/lib/services/carousel.service';
import { Console } from 'console';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
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
export class WishlistComponent implements OnInit {
  isloading:boolean = false;
  errorMsg:string = '';
  wishlist!:product[]
  ngOnInit(): void {
    this.GetWishList()
  }
  constructor(private _CartService:CartService,private _WishlistService:WishlistService,private toester:ToastrService,private _router:Router){
    console.log(this.wishlist)
  }

    //this function is used to Add product to cart

    addProductToCart(id:string,e:any){
      let X=e.srcElement
      let  html:string = `<i class="fa fa-spinner fa-spin "></i>`
      X.innerHTML = html
       this._CartService.AddProductToCart(id).subscribe({
         next:(res)=>{
           this._CartService.cartListquantity.next(res.numOfCartItems)
           this.toester.success(res.message,"",{positionClass:'toast-bottom-right'});
           let  html:string = ` <i class="fa-solid fa-add"></i> Add to Cart`
           X.innerHTML = html
         },
         error:(error)=>{
           this.toester.error('Error Happend ',"",{positionClass:'toast-bottom-right'});
   
         }
       })
       }

       product_details_navigate(id: any) {
        this._router.navigate(['/product_details', { id: id }]);
      }
    
      GetWishList(){
        this.isloading=true;
        this._WishlistService.GetWishList().subscribe({
          next:(res)=>{
            this.isloading =false;
           this.wishlist = res.data;
           console.log(this.wishlist)

          },
          error:(error)=>{
            this.isloading = false
    this.toester.error(error.error.message,"",{positionClass:'toast-bottom-right'});

  }
        })
      }

      removeFromWishList(id:string){
        this.isloading = true
        this._WishlistService.RemoveProductToWishList(id).subscribe({
          next:(res)=>{
            this.toester.success(res.message,"",{positionClass:'toast-bottom-right'});
         this.GetWishList()

          },
            error:(error)=>{
              this.isloading = false
      this.toester.error(error.error.message,"",{positionClass:'toast-bottom-right'});
  
    }
        })
      }
}
