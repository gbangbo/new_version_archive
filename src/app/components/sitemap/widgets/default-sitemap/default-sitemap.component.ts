import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

import { CardComponent } from "../../../../shared/components/ui/card/card.component";
import { menuItems } from '../../../../shared/data/menu';

@Component({
  selector: 'app-default-sitemap',
  imports: [CommonModule, TranslatePipe, CardComponent],
  templateUrl: './default-sitemap.component.html',
  styleUrl: './default-sitemap.component.scss'
})

export class DefaultSitemapComponent {

  public menuItem = menuItems;

}
