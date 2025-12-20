import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { SvgIconComponent } from "../../../../../shared/components/ui/svg-icon/svg-icon.component";

@Component({
  selector: 'app-advertisement',
  imports: [RouterModule,CardComponent, SvgIconComponent],
  templateUrl: './advertisement.component.html',
  styleUrl: './advertisement.component.scss'
})

export class AdvertisementComponent {

}
