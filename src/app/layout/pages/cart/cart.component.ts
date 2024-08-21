import { CurrencyPipe, isPlatformBrowser, NgClass } from '@angular/common';
import { afterNextRender, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CartService } from '../../../shared/services/cart/cart.service';
import { error } from 'console';
import { cartRes, Data, Product, Product2 } from '../../../shared/interfaces/cart_interface';
import { trigger, transition, style, animate } from '@angular/animations';
import { Route, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe,RouterLink,NgClass],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  animations: [
    trigger('openclose', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.5s ease-in', style({ opacity: 1 })),
      ]),

    ]),
  ],

})
export class CartComponent  implements OnInit{
  cartListData!:Data
  isloading:boolean = true;
  priceupdating:boolean = false;
  constructor(@Inject(PLATFORM_ID) private id:object,private _CartService:CartService, private _Router:Router, private toest:ToastrService)
  {
    if (isPlatformBrowser(id)) {
    
            localStorage.setItem("current_page",'/cart')
          }
  }
  ngOnInit(): void {
    this.getCart()
  }
  //this function get cart from api
  getCart(){
    this.isloading = true;
this._CartService.getCart().subscribe({
  next:(res)=>{
    this._CartService.cartListquantity.next(res.numOfCartItems)
    this.isloading = false

console.log(res)
this.cartListData = res.data
  },
  error:(error)=>{
    this.isloading = false
this.toest.error('Fail No cart for This user ','',{
  positionClass:'toast-bottom-right'
})
this._Router.navigate(['/home'])
  }

})
  }

    //this function change product count in the api

  ChangeProductQuauntity(quantity:number,productId:string){
    if (quantity <= 0) {
      this.DeleteProduct(productId);
    }else{
      this.priceupdating =true
    this._CartService.updatProductQuantity(quantity.toString(),productId).subscribe({
      next:(res)=>{
        this.priceupdating = false
        this.cartListData = res.data
        this._CartService.cartListquantity.next(res.numOfCartItems)

      },
      error:(error)=>{
        console.log(error)
      }
    })
  }
  }

   //this function delete product from the api
  DeleteProduct(productId:string){
    if (this.cartListData.products == null) {
      this.DeletCart()
    }
    this.isloading =true;
    this._CartService.RemoveProductFromCart(productId).subscribe({
      next:(res)=>{
        this.isloading = false
        this.cartListData = res.data;
        this._CartService.cartListquantity.next(res.numOfCartItems)
      },
      error:(error)=>{
        console.log(error);
      }
    })
  }

  DeletCart(){
    this._CartService.DeletCart().subscribe({
next:(res)=>{
  this._Router.navigate(['/home'])
},
error:(error)=>{
  console.log(error)
}
    });
    
  }
}