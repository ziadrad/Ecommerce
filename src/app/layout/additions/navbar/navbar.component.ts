import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
constructor(public _AuthService:AuthService,@Inject(PLATFORM_ID) private id:object,private _Router:Router){

}
clicked:boolean = false;
// this function toggle the navbar menu
toggle_menue():void{
  console.log(this.clicked)
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


}
