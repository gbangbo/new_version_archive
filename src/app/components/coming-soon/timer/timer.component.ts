import { Component } from '@angular/core';

@Component({
  selector: 'app-timer',
  imports: [],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss'
})

export class TimerComponent {

  public seconds: number;
  public interval;

  constructor() {
    this.interval = setInterval(function (this: any) {
      let currentDate = new Date();
      currentDate.setHours(0);
      currentDate.setMinutes(0);
      currentDate.setSeconds(0);

      let nowDate = new Date();
      let daysToAdd = 7;
      currentDate.setDate(currentDate.getDate() + daysToAdd);
      let distance = currentDate.getTime() - nowDate.getTime();

      this.document.querySelectorAll('#day').forEach((element: { innerHTML: number }) => {
          element.innerHTML = Math.floor(distance / (1000 * 60 * 60 * 24));
        });

      this.document.querySelectorAll('#hour').forEach((element: { innerHTML: number }) => {
          element.innerHTML = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        });

      this.document.querySelectorAll('#minute').forEach((element: { innerHTML: number }) => {
          element.innerHTML = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        });

      this.document.querySelectorAll('#second').forEach((element: { innerHTML: number }) => {
          element.innerHTML = Math.floor((distance % (1000 * 60)) / 1000);});
    }, this.seconds);
  }

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
  
}
