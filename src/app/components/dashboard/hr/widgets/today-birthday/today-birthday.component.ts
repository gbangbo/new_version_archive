import { Component } from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { birthdayUsers } from '../../../../../shared/data/dashboard/hr';

@Component({
  selector: 'app-today-birthday',
  imports: [CarouselModule, CardComponent],
  templateUrl: './today-birthday.component.html',
  styleUrl: './today-birthday.component.scss'
})

export class TodayBirthdayComponent {

  public birthdayUsers = birthdayUsers;

  public options = {
    loop: true,
    mouseDrag: false,
    autoplay: true,
    dots: false,
    nav: true,
    navSpeed: 1000,
    setInterval: true,
    navText: ['<i class="icon-angle-left"></i>', '<i class="icon-angle-right"></i>'],
    responsive: {
      0: {
        items: 1
      }
    },
  }

}
