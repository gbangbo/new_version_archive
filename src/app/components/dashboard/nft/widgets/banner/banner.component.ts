import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";

@Component({
  selector: 'app-banner',
  imports: [RouterModule, CardComponent],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss'
})

export class BannerComponent {

}
