import { CommonModule, ViewportScroller } from '@angular/common';
import { Component, HostListener } from '@angular/core';

import { FeatherIconComponent } from "../feather-icon/feather-icon.component";

@Component({
  selector: 'app-back-to-top',
  imports: [CommonModule, FeatherIconComponent],
  templateUrl: './back-to-top.component.html',
  styleUrl: './back-to-top.component.scss'
})

export class BackToTopComponent {

  public show: boolean = false;

  constructor(private viewScroller: ViewportScroller) { }

  @HostListener("window:scroll", [])

  onWindowScroll() {
    let number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  	if (number > 400) {
  	  this.show = true;
  	} else {
  	  this.show = false;
  	}
  }

  backToTop(){
    this.viewScroller.scrollToPosition([0, 0]);
  }
  
}
