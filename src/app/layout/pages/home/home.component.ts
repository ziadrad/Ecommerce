import { isPlatformBrowser } from '@angular/common';
import { afterNextRender, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ProducsComponent } from "../products/products.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProducsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(@Inject(PLATFORM_ID) private id:object)
  {
    if (isPlatformBrowser(id)) {
            localStorage.setItem("current_page",'/home')
          }
    
  }
}
