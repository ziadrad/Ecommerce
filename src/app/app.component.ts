import { Component, OnInit } from '@angular/core';
import {  RouterOutlet,  } from '@angular/router';
import { NavbarComponent } from "./layout/additions/navbar/navbar.component";
import { FooterComponent } from "./layout/additions/footer/footer.component";
import {  CarouselModule } from 'ngx-owl-carousel-o';

import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent   , CarouselModule,NgxSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  constructor() {}

  ngOnInit() {

  }
}
