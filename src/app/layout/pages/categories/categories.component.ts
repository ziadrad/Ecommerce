import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent  {
 
  
  constructor(@Inject(PLATFORM_ID) private id:object)
  {
    if (isPlatformBrowser(id)) {
    
            localStorage.setItem("current_page",'/categories')
          }
        
      
    
  }
}
