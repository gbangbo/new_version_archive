import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { categories, recentOrders } from '../../../../../shared/data/dashboard/e-commerce';
import { Categories, RecentOrders } from '../../../../../shared/interface/dashboard/e-commerce';
import { TooltipComponent } from "../../../../../shared/components/ui/tooltip/tooltip.component";

@Component({
  selector: 'app-recent-orders',
  imports: [CommonModule, RouterModule, CardComponent, TooltipComponent],
  templateUrl: './recent-orders.component.html',
  styleUrl: './recent-orders.component.scss'
})

export class RecentOrdersComponent {

  public categories = categories;
  public recentOrders = recentOrders;
  public activeCategory: string = 'furniture';
  public filteredOrders: RecentOrders[];

  ngOnInit() {
    if(this.activeCategory) {
      this.filteredOrders = this.recentOrders.filter((order) => {
        return order.category === this.activeCategory
      })
    }
  }

  changeCategory(category: Categories) {
    this.activeCategory = category.value;

    this.filteredOrders = this.recentOrders.filter((order) => {
      return order.category === this.activeCategory
    })
    
  }
  
}
