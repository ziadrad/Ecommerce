import { isPlatformBrowser } from '@angular/common';
import { afterNextRender, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
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
