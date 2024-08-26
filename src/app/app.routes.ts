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
import { ProductDetailsComponent } from './layout/additions/product-details/product-details.component';
import { ForgetPasswordMainComponent } from './layout/additions/forget_password/forget-password-main/forget-password-main.component';
import { CheckoutMainComponent } from './layout/additions/checkout/checkout.main/checkout.main.component';
import { AllordersComponent } from './layout/additions/allorders/allorders.component';
import { WishlistComponent } from './layout/additions/wishList/wishlist/wishlist.component';

export const routes: Routes = [
    
    {path:"", redirectTo:"home", pathMatch:"full"},
    {path:"product_details",canActivate:[authGuard], component:ProductDetailsComponent},
    {path:"home", component:HomeComponent,canActivate:[authGuard]},
    {path:"products", component:ProducsComponent,canActivate:[authGuard]},
    {path:"cart", component:CartComponent,canActivate:[authGuard]},
    {path:"wishList", component:WishlistComponent,canActivate:[authGuard]},
    {path:'checkout/:cartid', component:CheckoutMainComponent,canActivate:[authGuard]},
    {path:'allorders', component:AllordersComponent,canActivate:[authGuard]},
    {path:"categories", component:CategoriesComponent,canActivate:[authGuard]},
    {path:"brand", component:BrandComponent,canActivate:[authGuard]},
    {path:"login", component:LoginComponent},
    {path:"ForgetPassword", component:ForgetPasswordMainComponent},
    {path:"register", component:RegisterComponent},
    {path:"**", component:NotfoundComponent},
  


];
