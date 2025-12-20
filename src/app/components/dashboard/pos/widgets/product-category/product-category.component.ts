import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';
import { productCategory } from '../../../../../shared/data/dashboard/pos';

@Component({
  selector: 'app-product-category',
  imports: [RouterModule, CarouselModule, CardComponent],
  templateUrl: './product-category.component.html',
  styleUrl: './product-category.component.scss'
})
export class ProductCategoryComponent {

  public productCategory = productCategory;
  public options: OwlOptions = {
    loop: true,
    nav: false,
    dots: false,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: {
      0: {
        items: 2
      },
      336: {
        items: 3
      },
      436: {
        items: 4
      },
      674: {
        items: 5
      },
      926: {
        items: 6
      },
      1100: {
        items: 9
      }
    }
  }
}
