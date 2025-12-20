import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";

@Component({
  selector: 'app-welcome-card',
  imports: [RouterModule, CardComponent],
  templateUrl: './welcome-card.component.html',
  styleUrl: './welcome-card.component.scss'
})

export class WelcomeCardComponent {

  public intminute: any;
  public intsec: any;
  public inthour: any;
  public time: Date = new Date();
  public jstoday = '';
  public type: string = 'component';
  public today: number = Date.now();
  public dates = new Date().getDate();
  public month = new Date().getMonth();
  public year = new Date().getFullYear();
  public date: { year: number; month: number; } | string;

  constructor() { }

  setTime() {
    this.intminute = setInterval(function () {
      var second = new Date().getSeconds();
      var sdegree = second * 6;
      var srotate = "rotate(" + sdegree + "deg)";
      var seconds = document.getElementById('second')!.style.transform = srotate;
    }, 1000);
    this.intsec = setInterval(function () {
      var mins = new Date().getMinutes();
      var mdegree = mins * 6;
      var mrotate = "rotate(" + mdegree + "deg)";
      var minits = document.getElementById('minute')!.style.transform = mrotate;
    }, 1000);
    this.inthour = setInterval(function () {
      var hour = new Date().getHours();
      var mints = new Date().getMinutes();
      var times = new Date()

      var time = document.getElementById('txt')!.innerHTML = times.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

      var hdegree = hour * 30 + (mints / 2);
      var hrotate = "rotate(" + hdegree + "deg)";
      var hours = document.getElementById('hour')!.style.transform = hrotate;
    }, 1000);
  }

  ngOnInit() {
    const now: Date = new Date()
    this.setTime();
  }

  ngOnDestroy() {
    if (this.intminute) {
      clearInterval(this.intminute);
    }
    if (this.intsec) {
      clearInterval(this.intsec);
    }
    if (this.inthour) {
      clearInterval(this.inthour);
    }
  }
  
}
