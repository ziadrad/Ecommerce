import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Category } from '../../../shared/interfaces/data';
import { BrandsService } from '../../../shared/services/brands/brands.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-brand',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './brand.component.html',
  styleUrl: './brand.component.scss'
})
export class BrandComponent {
  BrandList!:Category[]
  ngOnInit(): void {
    this.spinner.show()
    this._BrandsService.getBrand().subscribe({
      next:(res)=>{
        this.BrandList=res.data
          this.spinner.hide()
        console.log(res)
      }
    })
  }
  constructor(@Inject(PLATFORM_ID) private id:object,private _BrandsService:BrandsService,private spinner:NgxSpinnerService)
  {
    if (isPlatformBrowser(id)) {
    
            localStorage.setItem("current_page",'/categories')
          }
        
      
    
  }
}
