import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CategoriesService } from '../../../shared/services/categories/categories.service';
import { Category } from '../../../shared/interfaces/data';
import { RouterLink } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent  implements OnInit{
 categoryList!:Category[]
  ngOnInit(): void {
    this.spinner.show()
    this._CategoriesService.getCategories().subscribe({
      next:(res)=>{
        this.categoryList=res.data
        this.spinner.hide()
        console.log(res)
      }
    })
  }
  constructor(@Inject(PLATFORM_ID) private id:object,private _CategoriesService:CategoriesService,private spinner:NgxSpinnerService)
  {
    if (isPlatformBrowser(id)) {
    
            localStorage.setItem("current_page",'/categories')
          }
        
      
    
  }
}
