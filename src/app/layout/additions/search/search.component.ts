import { Component, DoCheck, EventEmitter, OnChanges, Output, output, SimpleChanges } from '@angular/core';
import { ProductsService } from '../../../shared/services/products/products.service';
import { BrowserModule } from '@angular/platform-browser';
import { title } from 'process';
import { Product } from '../../../shared/interfaces/products_interface';
import { FormsModule, NgModel, NgModelGroup } from '@angular/forms';
import { SearchPipe } from '../../../shared/pips/search.pipe';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [SearchPipe,FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent  {
  constructor(public _ProductsService:ProductsService){
    
  }
text:string = ''
@Output() userWord = new EventEmitter<string>();
//this function work while searching in data
sendWord(event:string){
this.userWord.emit(this.text)
}


}
