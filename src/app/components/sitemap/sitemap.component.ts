import { Component } from '@angular/core';

import { DefaultSitemapComponent } from "./widgets/default-sitemap/default-sitemap.component";
import { TreeStructureSitemapComponent } from "./widgets/tree-structure-sitemap/tree-structure-sitemap.component";

@Component({
  selector: 'app-sitemap',
  imports: [DefaultSitemapComponent, TreeStructureSitemapComponent],
  templateUrl: './sitemap.component.html',
  styleUrl: './sitemap.component.scss'
})

export class SitemapComponent {

}
