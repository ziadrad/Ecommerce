import { isPlatformBrowser } from '@angular/common';
import { afterNextRender, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent  {
  constructor(@Inject(PLATFORM_ID) private id:object)
  {
    if (isPlatformBrowser(id)) {
    
            localStorage.setItem("current_page",'/cart')
          }
        
      
    
  }
}