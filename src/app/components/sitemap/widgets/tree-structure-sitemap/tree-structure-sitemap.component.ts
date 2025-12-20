import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

import { CardComponent } from "../../../../shared/components/ui/card/card.component";
import { menuItems } from '../../../../shared/data/menu';

@Component({
  selector: 'app-tree-structure-sitemap',
  imports: [CommonModule, TranslatePipe, CardComponent],
  templateUrl: './tree-structure-sitemap.component.html',
  styleUrl: './tree-structure-sitemap.component.scss'
})

export class TreeStructureSitemapComponent {

  public menuItem = menuItems;

}
