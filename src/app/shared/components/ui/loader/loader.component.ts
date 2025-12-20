import { Component } from '@angular/core';

@Component({
  selector: 'app-loader',
  imports: [],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})

export class LoaderComponent {

  public loaderHide: boolean = false;

  constructor(){
    setTimeout(() => {
      this.loaderHide = true;
    }, 2000);
  }
  
}
