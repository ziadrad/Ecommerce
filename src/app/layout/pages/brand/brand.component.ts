import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-brand',
  standalone: true,
  imports: [],
  templateUrl: './brand.component.html',
  styleUrl: './brand.component.scss'
})
export class BrandComponent {
  constructor(@Inject(PLATFORM_ID) private id:object)
  {
    if (isPlatformBrowser(id)) {
    
            localStorage.setItem("current_page",'/categories')
          }
        
      
    
  }
}
