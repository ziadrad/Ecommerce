import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from '../../../shared/services/categories/categories.service';
import { Category } from '../../../shared/interfaces/data';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-category-details',
  standalone: true,
  imports: [NgxSpinnerModule],
  templateUrl: './category-details.component.html',
  styleUrl: './category-details.component.scss',
  animations:[
    trigger('openclose', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.25s ease-in', style({ opacity: 1 })),
      ]),

      transition(':leave', [
        style({ opacity: 1 }),
        animate('0.25s ease-out', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class CategoryDetailsComponent implements OnInit{
  catid:string =''
  category!:Category
  ngOnInit(): void {
      this._CategoriesService.getSpeceficCategories(this.catid).subscribe({
    next:(res)=>{
    
      this.category=res.data
      this.spinner.hide()
    }
  })
  }
constructor( _ActivatedRoute:ActivatedRoute,private spinner:NgxSpinnerService,private _CategoriesService:CategoriesService){
  this.spinner.show()
  _ActivatedRoute.paramMap.subscribe((p)=>{
 this.catid=p.get('catid')!;
  })


}
}
