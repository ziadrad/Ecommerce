import { Routes } from '@angular/router';
import { HomeComponent } from './layout/pages/home/home.component';
import { ProducsComponent } from './layout/pages/products/products.component';
import { CartComponent } from './layout/pages/cart/cart.component';
import { CategoriesComponent } from './layout/pages/categories/categories.component';
import { BrandComponent } from './layout/pages/brand/brand.component';
import { NotfoundComponent } from './layout/additions/notfound/notfound.component';
import { LoginComponent } from './layout/pages/login/login.component';
import { RegisterComponent } from './layout/pages/register/register.component';
import { authGuard } from './shared/guard/auth.guard';
import { AllordersComponent } from './layout/additions/allorders/allorders.component';


export const routes: Routes = [
    
    {path:"", redirectTo:"home", pathMatch:"full"},
    {path:"product_details",canActivate:[authGuard],loadComponent: ()=> import('../app/layout/additions/product-details/product-details.component').then(c=>c.ProductDetailsComponent)},
    {path:"home", component:HomeComponent,canActivate:[authGuard]},
    {path:"products", component:ProducsComponent,canActivate:[authGuard],},
    {path:"cart", component:CartComponent,canActivate:[authGuard]},
    {path:"wishList",canActivate:[authGuard],loadComponent: ()=> import('../app/layout/additions/wishList/wishlist/wishlist.component').then(c=>c.WishlistComponent)},
    {path:'checkout/:cartid',canActivate:[authGuard],loadComponent: ()=> import('../app/layout/additions/checkout/checkout.main/checkout.main.component').then(c=>c.CheckoutMainComponent)},
    {path:'categoryDetals/:catid',canActivate:[authGuard],loadComponent: ()=> import('../app/layout/additions/category-details/category-details.component').then(c=>c.CategoryDetailsComponent)},
    {path:'brandDetals/:brandid', loadComponent: ()=> import('../app/layout/additions/brand-details/brand-details.component').then(c=>c.BrandDetailsComponent),canActivate:[authGuard]},
    {path:'allorders', component:AllordersComponent,canActivate:[authGuard]},
    {path:"categories", component:CategoriesComponent,canActivate:[authGuard]},
    {path:"brand", component:BrandComponent,canActivate:[authGuard]},
    {path:"login", component:LoginComponent},
    {path:"ForgetPassword",loadComponent: ()=> import('../app/layout/additions/forget_password/forget-password-main/forget-password-main.component').then(c=>c.ForgetPasswordMainComponent)},
    {path:"register", component:RegisterComponent},
    {path:"**", component:NotfoundComponent},
  


];
