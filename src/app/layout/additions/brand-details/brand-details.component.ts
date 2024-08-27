import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Category } from '../../../shared/interfaces/data';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CategoriesService } from '../../../shared/services/categories/categories.service';
import { BrandsService } from '../../../shared/services/brands/brands.service';

@Component({
  selector: 'app-brand-details',
  standalone: true,
  imports: [],
  templateUrl: './brand-details.component.html',
  styleUrl: './brand-details.component.scss',
  animations:[
    trigger('openclose', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.75s ease-in', style({ opacity: 1 })),
      ]),

      transition(':leave', [
        style({ opacity: 1 }),
        animate('0.75s ease-out', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class BrandDetailsComponent implements OnInit {
  brandid:string =''
  Brand!:Category
  ngOnInit(): void {

    this._brandservice.getSpeceficBrand(this.brandid).subscribe({
  next:(res)=>{
  
    this.Brand=res.data
    this.spinner.hide()
  }
})
}

constructor( _ActivatedRoute:ActivatedRoute,private spinner:NgxSpinnerService,private _brandservice:BrandsService){
  this.spinner.show()
  _ActivatedRoute.paramMap.subscribe((p)=>{
 this.brandid=p.get('brandid')!;
  })


}
}
