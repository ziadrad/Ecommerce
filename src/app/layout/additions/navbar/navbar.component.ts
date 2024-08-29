import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { isPlatformBrowser, NgOptimizedImage } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { CartService } from '../../../shared/services/cart/cart.service';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  animations: [
    trigger('openclose',[
     transition(':enter',[style({opacity:0}),animate('0.25s ease-in',style({ opacity:1}))]),
     
     transition(':leave',[style({opacity:1}),animate('0.25s ease-in',style({opacity:0}))]),
    ]),
   ]
})
export class NavbarComponent implements OnInit {
constructor(public _CartService:CartService,public _AuthService:AuthService,@Inject(PLATFORM_ID) private id:object,private _Router:Router){

}

ngOnInit(): void {
  if(this._AuthService.userData.getValue()){
  
  this._CartService.getCart().subscribe({
    next:(res)=>{
      this._CartService.cartListquantity.next(res.numOfCartItems)
        },
    error:(error)=>{
    this._CartService.cartListquantity.next(0)
    this._Router.navigate(['/home'])
    }
    
    })
  }
}
clicked:boolean = false;
// this function toggle the navbar menu
toggle_menue():void{
  if (this.clicked == false) {
    this.clicked=true;
  }else{
    this.clicked=false;
  }
}

//this function make data in UserData Null and remov Token to Logout User؛
logout(){
this._AuthService.userData.next(null);
if (isPlatformBrowser(this.id)) {
  localStorage.setItem("User_Token","")

}
this._Router.navigate(['login'])
}

choosed(){
  this.clicked = false;
}


}
